from pydantic import BaseModel, Field
from typing import Optional, Literal

# Request model
class RecommendRequest(BaseModel):
    location: str = Field(..., min_length=1)
    cuisines: list[str] = Field(default_factory=list, max_length=5)
    budget: Literal["low", "medium", "high"] = "medium"
    min_rating: float = Field(default=3.0, ge=1.0, le=5.0)
    dining_type: Optional[str] = None
    preferences: str = Field(default="", max_length=200)

# Response models
class RestaurantRecommendation(BaseModel):
    name: str
    location: str
    cuisines: list[str]
    rating: float
    cost_for_two: int
    votes: int
    rest_type: str
    online_order: bool
    book_table: bool
    dish_liked: list[str]
    ai_explanation: str
    confidence: Optional[float] = None

class RecommendResponse(BaseModel):
    recommendations: list[RestaurantRecommendation]
    summary: str
