from fastapi import FastAPI
import google.generativeai as genai
import os
from fastapi import FastAPI, Query, Body, HTTPException
from typing import Optional
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
from fastapi.middleware.cors import CORSMiddleware
import logging
from bias_detection import predict_article
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv() 
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]

# Initialize the model and tokenizer
model_name = "nlptown/bert-base-multilingual-uncased-sentiment"
model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

genai.configure(api_key=os.getenv("GEMINI_API"))
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def generateAIResponse(prompt):
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(prompt)
    print(response.text)
    return response.text

@app.get("/")
async def root():
    print(os.getenv("GEMINI_API"))
    return {"message": "Hello World"}

@app.get("/news")
async def fetch_news(category: Optional[str] = Query(None),
                     language: Optional[str] = Query("en"),
                     country: Optional[str] = Query(None)):
    print(os.environ.get("RAPID_API"))
    url = "https://newscafapi.p.rapidapi.com/apirapid/news/?q=news"
    headers = {
        "x-rapidapi-key": os.getenv("RAPID_API_KEY"),  # Access environment variable
        "x-rapidapi-host": "newscafapi.p.rapidapi.com",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        result = response.json()

        file_path = "newsdata.json"

        try:
            with open(file_path, "r") as f:
                existing_data = json.load(f)
        except FileNotFoundError:
            existing_data = [] 

        if isinstance(existing_data, list):
            updated_data = result + existing_data
        else:
            updated_data = [result] + [existing_data]

        with open(file_path, "w") as f:
            json.dump(updated_data, f, indent=4)

        return {"message": "News data fetched and saved successfully"}

    except requests.exceptions.RequestException as error:
        return {"error": str(error)}
    except OSError as error:
        return {"error": f"Error writing to file: {error}"}

def load_fake_data():
  with open("newsdata.json", "r") as f:
    data = json.load(f)
  return data

@app.get("/news-data")
def get_fake_data():
  return load_fake_data()

# Define the labels for predictions
bias_classes = ["Biased", "No agreement", "Non-biased"]
opinion_classes = [
    "Somewhat factual but also opinionated", 
    "Expresses writer’s opinion", 
    "No agreement", 
    "Entirely factual"
]
type_classes = ["Center", "Left", "Right"]

@app.post("/predict_bias")
async def predict_bias(data: dict = Body(...)):
    try:
        # Expecting a list of articles in the data
        articles = data.get("articles")
        if not articles:
            raise ValueError("No articles provided")

        bias_predictions = []
        
        for article in articles:
            text = article.get("text")  # Assuming each article has a 'text' field
            bias_class, opinion_class, type_class = predict_article(text)  # Call the prediction function

          # Map the numeric predictions to their respective labels
            bias_label = bias_classes[bias_class]  # Get bias label
            opinion_label = opinion_classes[opinion_class]  # Get opinion label
            type_label = type_classes[type_class]  # Get type label

            bias_predictions.append({
                "article": text,
                 "bias": bias_label,           
                "opinion": opinion_label,     
                "type": type_label,                
            })

        return {"bias_predictions": bias_predictions}

    except (ValueError, Exception) as err:
        raise HTTPException(status_code=400, detail=str(err))

@app.post("/get-context")
async def get_context(data: dict = Body(...)):

  try:
    title = data.get('data').get("title")
    content = data.get('data').get("content")
    print(data)
    if not title or not content:
      raise ValueError("Missing title or content in request body.")

    airesp = await generateAIResponse(f"Provide a brief of this news headlining ({title}) {content}")
    return {'result': airesp}
  except (ValueError, Exception) as err:
    raise HTTPException(status_code=400, detail=str(err))  # Handle specific errors

@app.post("/respond")
async def respond(data: dict = Body(...)):
  try:
    print("data", data)
    message = data.get("data").get("msg")
    if not message:
      raise ValueError("Missing message in request body.")

    airesp = await generateAIResponse(message)
    return {'result': airesp}
  except (ValueError, Exception) as err:
    raise HTTPException(status_code=400, detail=str(err))  
  
@app.post("/analyze_sentiment")
async def analyze_sentiment(data: dict = Body(...)):
    try:
        text = data.get('text', '')
        if not text:
            raise ValueError("No text provided")

        # Tokenize and analyze sentiment
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
            predictions = F.softmax(outputs.logits, dim=1)
            label = torch.argmax(predictions, dim=1).item()

        # Map the predicted label to sentiment (assuming 1-5 scale from the model)
        if label in [0, 1]:  # 1 and 2 in 5-star scale
            sentiment = "NEGATIVE"
        elif label == 2:  # 3 in 5-star scale
            sentiment = "NEUTRAL"
        else:  # 4 and 5 in 5-star scale
            sentiment = "POSITIVE"

        return {'sentiment': sentiment}
    except (ValueError, Exception) as err:
        raise HTTPException(status_code=400, detail=str(err))
