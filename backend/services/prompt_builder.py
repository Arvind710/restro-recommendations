import json
from models.schemas import RecommendRequest

def build_prompt(user_preferences: RecommendRequest, filtered_restaurants: list):
    num_candidates = len(filtered_restaurants)
    system_message = f"""You are an elite food connoisseur and culinary critic based in Bangalore, India.
You are given a list of pre-filtered restaurants and the user's specific dining preferences.
Your job is to critically rank these restaurants and write a compelling, highly personalized review explaining why each restaurant earned its specific rank.

Rules for your explanations:
- You MUST return EXACTLY {num_candidates} recommendations from the provided list.
- Only recommend from the provided list.
- Write like a food connoisseur: use vivid, appetizing language to describe the ambiance, flavor profiles, and overall dining experience.
- Compare the restaurant to the others on the list. Explain WHY it is ranked where it is (e.g., "While the others have great ambiance, this spot takes the top rank due to its unparalleled authentic biryani...").
- If a restaurant doesn't perfectly match the user's criteria, explicitly state why you included it as a worthy alternative.
- Highlight specific dishes from their 'dish_liked' list.
- Keep the explanation to 3-4 sentences.
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
