# Problem Statement: AI-Powered Restaurant Recommendation Web App (Zomato Use Case)

You are tasked with building an **AI-powered restaurant recommendation web application** inspired by Zomato. The system should intelligently suggest restaurants based on user preferences by combining structured data with a **Large Language Model (LLM)**, delivered as a modern **full-stack web app** (React + Vite frontend, FastAPI backend).

---

## Objective

Design and implement a **web application** that:

- Provides an interactive browser-based UI for users to input preferences (location, budget, cuisine, ratings)
- Uses a real-world dataset of restaurants (Bangalore-specific, sourced from HuggingFace)
- Leverages an LLM (Groq — llama-3.3-70b-versatile) to generate personalized, human-like recommendations
- Displays clear, visually rich results in the browser with a premium, dark-mode design

---

## System Workflow

### 1. Data Ingestion

- Load and preprocess the Zomato dataset from Hugging Face:  
  🔗 [ManikaSaini/zomato-restaurant-recommendation](https://huggingface.co/datasets/ManikaSaini/zomato-restaurant-recommendation)
- Extract relevant fields such as restaurant name, location, cuisine, cost, rating, etc.

### 2. User Input

Collect user preferences:

| Preference | Example |
|---|---|
| **Location** | Delhi, Bangalore |
| **Budget** | Low, Medium, High |
| **Cuisine** | Italian, Chinese |
| **Minimum Rating** | 3.5+ |
| **Additional Preferences** | Family-friendly, Quick service |

### 3. Integration Layer

- Filter and prepare relevant restaurant data based on user input
- Pass structured results into an LLM prompt
- Design a prompt that helps the LLM reason and rank options

### 4. Recommendation Engine

Use the LLM to:

- **Rank** restaurants
- **Provide explanations** — why each recommendation fits the user's preferences
- **Optionally summarize** choices for quick decision-making

### 5. Output Display (Web UI)

Present top recommendations as interactive cards in the browser UI:

| Field | Description |
|---|---|
| 🏪 **Restaurant Name** | Name of the recommended restaurant |
| 🍽️ **Cuisine** | Type of cuisine served |
| ⭐ **Rating** | Average user rating |
| 💰 **Estimated Cost** | Approximate cost for two |
| 🤖 **AI Explanation** | AI-generated reason for the recommendation |

> **Tech Stack**: React + Vite (frontend) · FastAPI (backend) · Groq LLM · Vercel + Railway (deployment)

