import os
from smolagents import LiteLLMModel

def connect_with_GPT():
    model = LiteLLMModel(model_id="gpt-4o-mini",api_key=os.getenv('OPENAI_API_KEY'))
    return model