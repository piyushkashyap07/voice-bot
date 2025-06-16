# Project Setup

## Running the Project

### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend
1. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
2. Activate the virtual environment:
   - **Windows**:
     ```sh
     venv\Scripts\activate
     ```
   - **Mac/Linux**:
     ```sh
     source venv/bin/activate
     ```
3. Install dependencies from `requirements.txt`:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```sh
   python run.py
   ```

## OpenAI API Keys
Ensure that OpenAI API keys are added in both the frontend and backend.

- **Frontend**: Store the API key in environment variables or a configuration file.
- **Backend**: Store the API key in an `.env` file or a secure environment variable.

## Tech Stack Used
- **Frontend**: React.js, Next.js
- **Backend**: FastAPI, Python
- **AI Integration**: SmolAgents, OpenAI Whisper (Translation)
- **Programming Languages**: JavaScript, Python
