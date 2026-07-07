from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import recommend
from services import data_service
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Restro Recommendations API")

# Configure CORS
allowed_origins = [origin.strip() for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data on startup
@app.on_event("startup")
def startup_event():
    logger.info("Starting up and loading data...")
    data_service.load_data()

app.include_router(recommend.router)
