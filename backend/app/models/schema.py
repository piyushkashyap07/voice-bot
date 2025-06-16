from pydantic import BaseModel
from typing import List, Optional,Union

class ApiResponse(BaseModel):
    status_code: int
    message: str
    data: Union[list, dict, None]  # Using dict to hold the raw data

class UserQuery(BaseModel):
    user_query:str