from fastapi import HTTPException
from app.controllers.handle_message import handle_messages
from app.models.schema import UserQuery
from app import app
from datetime import datetime
import pytz


@app.get("/server-check")
def health_check():
    try:
        ist = pytz.timezone('Asia/Kolkata')
        current_time = datetime.now(ist).strftime("%Y-%m-%d %H:%M:%S")
        response = {
            "status_code": 200,
            "message": "Server check successful.",
            "data": {
                "timestamp": current_time
            }
        }
        return response

    except Exception as e:
        response = {
            "status_code": 500,
            "message": "Health check failed.",
            "data": {
                "error": str(e)
            }
        }
        return response
    
@app.post("/handle_message")
def handle_message(request: UserQuery):
    try:
        response = handle_messages(request)
        return response
    except Exception as e:
        print(f"Invalid {e}")
        return ({"message": f"There was an error + {e}"}), 400
