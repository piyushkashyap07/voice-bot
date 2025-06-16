# Personal AI Assistant Backend

## Overview

This is a FastAPI-based backend for a personal AI assistant that represents **Piyush Kashyap**. The system uses OpenAI's GPT models to create a voice-enabled AI assistant that can answer questions about Piyush's life, work, skills, and experiences as if it's Piyush speaking about himself.

## Features

- **Personal AI Assistant**: AI that speaks as Piyush Kashyap in first person
- **Voice Integration**: Supports voice-to-text and text-to-speech through frontend
- **Natural Conversations**: Responds naturally and conversationally
- **Crisp Responses**: Optimized for voice interaction with short, focused answers
- **Real-time Processing**: Fast response times for interactive conversations

## Tech Stack

- **Framework**: FastAPI
- **AI Model**: OpenAI GPT-4o-mini
- **Language**: Python 3.x
- **Dependencies**: See `requirements.txt`

## Project Structure

```
backend/
├── app/
│   ├── config/
│   │   └── candidate_profile.py    # Piyush's personal information
│   ├── controllers/
│   │   ├── handle_message.py       # Main message handler
│   │   └── personal_agent.py       # Personal assistant logic
│   ├── database/
│   │   └── openai.py              # OpenAI connection
│   ├── models/
│   │   └── schema.py              # API data models
│   ├── prompts/
│   │   └── personal_prompt.py     # AI response guidelines
│   └── routes/
│       └── routes.py              # API endpoints
├── requirements.txt               # Python dependencies
├── run.py                        # Server startup script
└── README.md                     # This file
```

## Setup Instructions

### 1. Environment Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run the Server

```bash
python run.py
```

The server will start on `http://localhost:8000`

## API Endpoints

### Health Check
- **GET** `/server-check`
- Returns server status and timestamp

### Message Handler
- **POST** `/handle_message`
- **Body**: `{"user_query": "your question here"}`
- **Response**: `{"status_code": 200, "message": "Success", "data": {"queryResponse": "AI response"}}`

## Configuration

### Personal Profile

The AI assistant's knowledge about Piyush is stored in `app/config/candidate_profile.py`. This includes:

- Life story and background
- Professional experience (3.6 years)
- Skills and superpowers
- Growth areas and goals
- Personal values and principles
- Work style and preferences

### Customizing Responses

To modify how the AI responds:

1. **Response Length**: Adjust `max_tokens` in `handle_message.py`
2. **Response Style**: Modify prompts in `personal_prompt.py`
3. **Personal Info**: Update `candidate_profile.py`

## How It Works

1. **User Input**: Frontend sends user query to `/handle_message`
2. **Profile Loading**: System loads Piyush's profile information
3. **Prompt Creation**: Creates context-aware prompt with profile data
4. **AI Processing**: Sends to OpenAI GPT-4o-mini for response generation
5. **Response**: Returns natural, first-person response as Piyush

## Key Features

### First-Person Responses
The AI always speaks **as** Piyush (first person), not **about** Piyush (third person).

### Voice-Optimized
Responses are kept short (2-3 sentences) for better voice interaction.

### Natural Conversations
The AI responds conversationally, as if Piyush is speaking directly.

## Development

### Adding New Features

1. **New Endpoints**: Add to `app/routes/routes.py`
2. **New Models**: Add to `app/models/schema.py`
3. **New Logic**: Add to `app/controllers/`

### Testing

Test the API endpoints using tools like:
- Postman
- curl
- Frontend application

### Example API Call

```bash
curl -X POST "http://localhost:8000/handle_message" \
     -H "Content-Type: application/json" \
     -d '{"user_query": "Who are you?"}'
```

## Dependencies

Key dependencies include:
- `fastapi`: Web framework
- `openai`: OpenAI API client
- `uvicorn`: ASGI server
- `python-dotenv`: Environment variable management
- `pydantic`: Data validation

## Troubleshooting

### Common Issues

1. **OpenAI API Key**: Ensure your API key is set in `.env`
2. **Port Conflicts**: Change port in `run.py` if 8000 is busy
3. **Dependencies**: Reinstall with `pip install -r requirements.txt`

### Logs

Check console output for error messages and debugging information.

## Security Notes

- Keep your OpenAI API key secure
- Don't commit `.env` files to version control
- Consider rate limiting for production use

## License

This project is for personal use and interview purposes.

---

**Note**: This system is designed to represent Piyush Kashyap authentically in AI conversations. All responses are based on the profile information provided and are intended for interview and demonstration purposes.
