from fastapi import FastAPI
import google.generativeai as genai
import os
from fastapi import FastAPI, Query, Body, HTTPException
from typing import Optional
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv() 
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
]


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

    # Specify your desired file path here
    file_path = "newsdata.json"

    # Choose the appropriate mode for file writing (overwrite or append)
    with open(file_path, "w") as f:
      f.write(json.dumps(result))

    return {"message": "News data fetched and saved successfully"}
  except requests.exceptions.RequestException as error:
    return {"error": str(error)}
  except OSError as error:
    return {"error": f"Error writing to file: {error}"}
  

def load_fake_data():
  with open("newsdata.json", "r") as f:
    data = json.load(f)
  return data

@app.get("/fake-data")
def get_fake_data():
  return load_fake_data()

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
