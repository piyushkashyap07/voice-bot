from app.database.openai import connect_with_GPT
from app.prompts.personal_prompt import get_personal_system_prompt
from app.config.candidate_profile import get_formatted_profile
from smolagents import CodeAgent, ManagedAgent, Tool, ToolCallingAgent
import os

class PersonalAssistantTool(Tool):
    name = "Personal_Assistant"
    description = "You are an AI assistant that knows about Piyush Kashyap. You can answer questions about his life, skills, experiences, and personality. Answer naturally as if you're telling someone about Piyush."
    inputs = {
        "query": {
            "type": "string",
            "description": "Any question about Piyush Kashyap - his life, work, skills, personality, etc.",
        }
    }
    output_type = "string"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def forward(self, query: str) -> str:
        # Get Piyush's information
        piyush_info = get_formatted_profile()
        
        # Simple prompt that tells the AI about Piyush
        prompt = f"""
You are an AI assistant that knows about Piyush Kashyap. Here's what you know about him:

{piyush_info}

When someone asks you about Piyush, answer naturally and conversationally. You're not conducting an interview - you're just sharing information about Piyush as if you know him well.

Question: {query}

Answer about Piyush:
"""
        
        return prompt

# Create the personal assistant agent
personal_assistant_agent = CodeAgent(tools=[PersonalAssistantTool()], model=connect_with_GPT())

# Managed agent for personal information
managed_personal_agent = ManagedAgent(
    agent=personal_assistant_agent,
    name="Personal_Assistant_Agent",
    description="An assistant that knows about Piyush Kashyap and can answer questions about him.",
) 