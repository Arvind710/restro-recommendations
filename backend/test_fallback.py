import asyncio
from models.schemas import RecommendRequest
from services import data_service

data_service.load_data()
req = RecommendRequest(
    location="Whitefield",
    cuisines=["Continental"],
    budget="medium",
    min_rating=3,
    dining_type="Drinks & nightlife ",
    preferences="good beer, good for dates"
)
try:
    res = data_service.filter_restaurants(req)
    print(len(res))
except Exception as e:
    import traceback
    traceback.print_exc()
