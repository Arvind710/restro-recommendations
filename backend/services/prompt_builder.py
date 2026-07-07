import json
from models.schemas import RecommendRequest

def build_prompt(user_preferences: RecommendRequest, filtered_restaurants: list):
    system_message = """You are a restaurant recommendation expert for Bangalore, India.
You are given a list of pre-filtered restaurants and user preferences.
Your job is to rank the top restaurants and explain why each fits.

Rules:
- You MUST return EXACTLY 5 recommendations from the provided list.
- Only recommend from the provided list.
- If a restaurant does not perfectly match the user's criteria, explain why it is the "next best alternative" (e.g., "This is slightly over budget, but serves excellent Continental food.").
- Be specific: mention dishes, ambiance, value for money.
- Consider the user's budget and cuisine preferences.
- Return valid JSON matching the schema provided.
"""
    
    # Format user preferences
    prefs = {
        "location": user_preferences.location,
        "cuisines": user_preferences.cuisines,
        "budget": user_preferences.budget,
        "min_rating": user_preferences.min_rating,
        "dining_type": user_preferences.dining_type,
        "preferences": user_preferences.preferences
    }
    
    # Structure the restaurants list
    restaurant_list = []
    for r in filtered_restaurants:
        restaurant_list.append({
            "name": r.get("name"),
            "location": r.get("location"),
            "cuisines": r.get("cuisines"),
            "cost_for_two": r.get("cost_for_two"),
            "rating": r.get("rating"),
            "rest_type": r.get("rest_type"),
            "dish_liked": r.get("dish_liked"),
        })

    user_message = f"""
User Preferences:
{json.dumps(prefs, indent=2)}

Filtered Restaurants:
{json.dumps(restaurant_list, indent=2)}

Please return a JSON object with the following structure:
{{
  "recommendations": [
    {{
      "name": "Restaurant Name (must match exactly)",
      "ai_explanation": "2-3 sentences explaining why this fits.",
      "confidence": 9
    }}
  ],
  "summary": "Overall recommendation overview"
}}
"""
    return system_message, user_message
