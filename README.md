# AI-Powered HCP Interaction Logger

This project is an AI-powered CRM assistant for pharmaceutical field representatives.

The application allows users to describe interactions with healthcare professionals using natural language.

Using LangGraph and Groq LLM, the system extracts structured information and automatically fills the interaction form.

## Features

- Natural language interaction logging
- Automatic extraction of:
  - HCP Name
  - Hospital
  - Interaction Type
  - Products Discussed
  - Materials Shared
  - Objections
  - Follow-up Date
  - Sentiment Analysis
- Context-aware editing
- Chat history with scrolling
- Responsive UI

## Tech Stack

Frontend:
- React
- Redux Toolkit
- Material UI
- Axios

Backend:
- FastAPI
- LangGraph
- LangChain
- Groq API

AI:
- Llama 3.3 70B Versatile
 
 
## Installation
1st Terminal(Backend):
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload

2nd Terminal(Frontend):
cd frontend

npm install

npm run dev

# .env (IMP FILE CREATION IN BACKEND FOLDER)
create a file named (.env) in the backend folder and paste this code

# GROQ_API_KEY=paste_your_groq_api_key

# MODEL_NAME=llama-3.3-70b-versatile

# DATABASE_URL=postgresql://postgres:password@localhost:5432/hcpcrm
