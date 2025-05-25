# SMART News Backend API

FastAPI-based backend service providing AI-powered news analysis capabilities including sentiment analysis, bias detection, and intelligent chatbot interactions.

## Features

- **News Data Management**: Fetch and serve news articles from external APIs
- **Sentiment Analysis**: BERT-based sentiment classification (Positive/Negative/Neutral)
- **Bias Detection**: Multi-class classification for political bias and opinion detection
- **AI Chatbot**: Context-aware responses using Google Gemini AI
- **CORS Support**: Configured for frontend integration
- **RESTful API**: Well-structured endpoints with proper error handling

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **Google Gemini AI**: Large language model for conversational AI
- **Transformers (Hugging Face)**: Pre-trained BERT models for NLP tasks
- **PyTorch**: Deep learning framework
- **Python-dotenv**: Environment variable management
- **Uvicorn**: ASGI server implementation

## Project Structure

```
backend/
├── main.py              # Main FastAPI application
├── bias_detection.py    # Bias detection ML model
├── requirements.txt     # Python dependencies
├── newsdata.json       # Cached news data
└── .env        # Environment variables (create this)
```

## Installation & Setup

### Prerequisites
- Python 3.11+ (recommended)
- pip or poetry for package management

### Step-by-Step Setup

1. **Create and activate virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install fastapi "uvicorn[standard]" google-generativeai transformers torch python-dotenv requests
   ```

3. **Set up environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   # Google Gemini AI API Key
   GEMINI_API=your_google_gemini_api_key_here
   
   # RapidAPI Key for news data
   RAPID_API_KEY=your_rapidapi_key_here
   ```

4. **Start the server**:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## AI Models Used

### Sentiment Analysis
- **Model**: `nlptown/bert-base-multilingual-uncased-sentiment`
- **Type**: Fine-tuned BERT for sentiment classification
- **Output**: 5-class sentiment mapped to Positive/Negative/Neutral

### Bias Detection
- **Model**: Custom TensorFlow/Keras model
- **Features**: Multi-output classification
- **Outputs**: 
  - Bias level (3 classes)
  - Opinion level (4 classes)
  - Political leaning (3 classes)

### Conversational AI
- **Model**: Google Gemini 1.5 Flash
- **Use**: Context-aware chat responses and article summarization