import os
import json
import re
from datetime import datetime

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)


def extract_interaction_data(text):

    prompt = f"""
You are an AI CRM assistant for pharmaceutical field representatives.

Extract the interaction details and return ONLY valid JSON.

Required fields:
- hcp_name
- hospital
- interaction_type
- products_discussed
- objections
- materials_requested
- follow_up_date
- sentiment
- time
- summary

Rules:
1. Return ONLY valid JSON.
2. Do not include explanations or markdown.
3. Use empty strings if information is missing.
4. products_discussed, objections and materials_requested should be arrays.
5. Convert relative dates such as:
   - next Tuesday
   - tomorrow
   - next week
   into YYYY-MM-DD format.
6. Infer interaction_type:
   - meeting → if doctor was met in person
   - call → if conversation happened over phone
   - email → if email communication is mentioned
7. If interaction type cannot be determined, return an empty string.
8. If no follow_up_date is mentioned, return an empty string.
9. If the user is modifying an existing interaction, return ONLY the fields that changed.
10. Determine sentiment:
    - positive
    - neutral
    - negative

Today's date is {datetime.today().strftime("%Y-%m-%d")}.

Interaction:
{text}
"""

    response = llm.invoke(
        [HumanMessage(content=prompt)]
    )

    content = response.content.strip()

    # Remove markdown wrappers if present
    content = content.replace("```json", "")
    content = content.replace("```", "")
    content = content.strip()

    print("\n===== RAW LLM RESPONSE =====")
    print(content)
    print("============================\n")

    try:
        parsed = json.loads(content)

        # Convert arrays to comma separated strings
        for field in [
            "products_discussed",
            "materials_requested",
            "objections"
        ]:
            if isinstance(parsed.get(field), list):
                parsed[field] = ", ".join(
                    parsed[field]
                )

        return parsed

    except Exception as e:

        print("\nJSON Parse Error:", e)

        try:
            json_match = re.search(
                r"\{.*\}",
                content,
                re.DOTALL
            )

            if json_match:

                parsed = json.loads(
                    json_match.group()
                )

                for field in [
                    "products_discussed",
                    "materials_requested",
                    "objections"
                ]:
                    if isinstance(parsed.get(field), list):
                        parsed[field] = ", ".join(
                            parsed[field]
                        )

                return parsed

        except Exception as inner_error:
            print(
                "Secondary Parse Error:",
                inner_error
            )

        return {
            "hcp_name": "",
            "hospital": "",
            "interaction_type": "",
            "products_discussed": "",
            "objections": "",
            "materials_requested": "",
            "follow_up_date": "",
            "sentiment": "",
            "time": "",
            "summary": content
        }