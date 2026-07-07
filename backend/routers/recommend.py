from fastapi import APIRouter, HTTPException, Body
from models.schemas import RecommendRequest, RecommendResponse, RestaurantRecommendation
from services import data_service
from services import prompt_builder
from services import llm_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api")

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/locations")
def get_locations():
    return data_service.get_locations()

@router.get("/cuisines")
def get_cuisines():
    return data_service.get_cuisines()

@router.post("/recommend", response_model=RecommendResponse)
def get_recommendations(request: RecommendRequest = Body(...)):
    # 1. Filter restaurants
    candidates = data_service.filter_restaurants(request)
    
    if not candidates:
        # Edge case: return empty results with helpful message
        return RecommendResponse(
            recommendations=[],
            summary="We couldn't find any restaurants matching your exact preferences in that location. Try relaxing your filters!"
        )
        
    # Limit to top 5 for the LLM
    top_5_candidates = candidates[:5]
        
    # 2. Build prompt
    system_msg, user_msg = prompt_builder.build_prompt(request, top_5_candidates)
    
    # 3. Call LLM
    llm_response = llm_service.get_recommendations(system_msg, user_msg)
    
    if not llm_response:
        # Fallback if Groq API fails
        logger.warning("Falling back to raw filtered results without AI explanations.")
        recommendations = []
        for c in top_5_candidates:
            recommendations.append(RestaurantRecommendation(
                name=c.get("name", "Unknown"),
                location=c.get("location", ""),
                cuisines=c.get("cuisines", []),
                rating=c.get("rating", 0.0),
                cost_for_two=c.get("cost_for_two", 0),
                votes=c.get("votes", 0),
                rest_type=c.get("rest_type", ""),
                online_order=c.get("online_order", False),
                book_table=c.get("book_table", False),
                dish_liked=c.get("dish_liked", []),
                ai_explanation="This restaurant matches your preferences.",
                confidence=None
            ))
            
        return RecommendResponse(
            recommendations=recommendations,
            summary="Here are some top choices based on your filters."
        )
        
    # 4. Parse LLM response and merge with restaurant data
    recommendations = []
    seen_names = set()
    candidate_lookup = {c.get("name").lower(): c for c in top_5_candidates if c.get("name")}
    
    ai_recs = llm_response.get("recommendations", [])
    for rec in ai_recs:
        ai_name = rec.get("name", "")
        if ai_name.lower() in seen_names:
            continue
            
        c = candidate_lookup.get(ai_name.lower())
        
        if not c:
            # Try partial match
            for cand_name, cand_data in candidate_lookup.items():
                if ai_name.lower() in cand_name or cand_name in ai_name.lower():
                    c = cand_data
                    break
                    
        if c:
            seen_names.add(ai_name.lower())
            seen_names.add(c.get("name", "").lower())
            recommendations.append(RestaurantRecommendation(
                name=c.get("name", "Unknown"),
                location=c.get("location", ""),
                cuisines=c.get("cuisines", []),
                rating=c.get("rating", 0.0),
                cost_for_two=c.get("cost_for_two", 0),
                votes=c.get("votes", 0),
                rest_type=c.get("rest_type", ""),
                online_order=c.get("online_order", False),
                book_table=c.get("book_table", False),
                dish_liked=c.get("dish_liked", []),
                ai_explanation=rec.get("ai_explanation", "Good choice based on your preferences."),
                confidence=rec.get("confidence")
            ))
            
    summary = llm_response.get("summary", "Here are your tailored recommendations.")
    
    # Fallback if recommendations are empty
    if not recommendations:
        for c in top_5_candidates:
            recommendations.append(RestaurantRecommendation(
                name=c.get("name", "Unknown"),
                location=c.get("location", ""),
                cuisines=c.get("cuisines", []),
                rating=c.get("rating", 0.0),
                cost_for_two=c.get("cost_for_two", 0),
                votes=c.get("votes", 0),
                rest_type=c.get("rest_type", ""),
                online_order=c.get("online_order", False),
                book_table=c.get("book_table", False),
                dish_liked=c.get("dish_liked", []),
                ai_explanation="This restaurant matches your preferences.",
                confidence=None
            ))
            
    return RecommendResponse(
        recommendations=recommendations,
        summary=summary
    )
