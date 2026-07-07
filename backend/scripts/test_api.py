import httpx
from fastapi.testclient import TestClient
from main import app

def test_api():
    with TestClient(app) as client:
        print("Testing /api/health...")
        resp = client.get("/api/health")
        print(resp.status_code, resp.json())
        
        print("\nTesting /api/locations...")
        resp = client.get("/api/locations")
        print(resp.status_code, f"Found {len(resp.json())} locations")
        
        print("\nTesting /api/cuisines...")
        resp = client.get("/api/cuisines")
        print(resp.status_code, f"Found {len(resp.json())} cuisines")
        
        print("\nTesting /api/recommend...")
        resp = client.post("/api/recommend", json={
            "location": "Indiranagar", 
            "cuisines": ["Italian"], 
            "budget": "medium", 
            "min_rating": 3.5
        })
        print(resp.status_code)
        if resp.status_code == 200:
            data = resp.json()
            print(f"Summary: {data.get('summary')}")
            for r in data.get("recommendations", []):
                print(f"- {r.get('name')} ({r.get('rating')} stars) - {r.get('ai_explanation')}")
        else:
            print(resp.text)

if __name__ == "__main__":
    test_api()
