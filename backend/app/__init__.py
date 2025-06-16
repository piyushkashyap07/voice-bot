from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title="Voice-Bot-Piyush-Kashyap",
    description="""This project is using a open ai whisper."""
)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

from app.routes import routes