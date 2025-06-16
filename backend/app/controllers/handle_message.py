from app.database.openai import connect_with_GPT
from app.models.schema import ApiResponse
from app.controllers.personal_agent import PersonalAssistantTool
import openai
import os

def handle_messages(input_text):
    try:
        # Get Piyush's information
        from app.config.candidate_profile import get_formatted_profile
        piyush_info = get_formatted_profile()
        
        # Create a simple prompt with emphasis on brevity and first person
        prompt = f"""
You are Piyush Kashyap. You are speaking as Piyush, not about Piyush. Here's information about yourself:

{piyush_info}

When someone asks you questions, answer as Piyush speaking about yourself in FIRST PERSON (I, me, my). Keep responses SHORT and CRISP (2-3 sentences maximum).

IMPORTANT: 
- Always speak as Piyush (first person)
- Never say "Piyush's" or "Piyush is" 
- Say "I am", "My", "I have" etc.
- Keep answers brief and to the point

Question: {input_text.user_query.strip()}

Answer as Piyush (first person, keep it short):
"""
        
        # Use OpenAI directly
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You ARE Piyush Kashyap. Always speak in first person (I, me, my). Keep responses SHORT and CRISP (2-3 sentences max). Never speak about Piyush in third person."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,  # Reduced from 500 to force shorter responses
            temperature=0.7
        )
        
        answer = response.choices[0].message.content.strip()
        return ApiResponse(status_code=200, message="Success", data={"queryResponse": answer})
        
    except Exception as e:
        return ApiResponse(status_code=500, message="Internal Server Error", data={"error": str(e)})
