import json
import httpx
import os

BASE_URL = "http://localhost:8000"

TESTS = [
    {
        "id": "L1",
        "name": "Italian, Medium Budget",
        "payload": {"location": "Indiranagar", "cuisines": ["Italian"], "budget": "medium"}
    },
    {
        "id": "L2",
        "name": "Family Friendly, Affordable",
        "payload": {"location": "Koramangala", "cuisines": ["North Indian", "Chinese"], "budget": "low", "preferences": "family-friendly"}
    },
    {
        "id": "L3",
        "name": "Premium, High Rating",
        "payload": {"location": "Whitefield", "budget": "high", "min_rating": 4.0}
    },
    {
        "id": "L4",
        "name": "South Indian Veg, Quick Service",
        "payload": {"location": "Malleshwaram", "cuisines": ["South Indian"], "preferences": "vegetarian, quick service"}
    },
    {
        "id": "L5",
        "name": "Continental, Date Night Rooftop",
        "payload": {"location": "MG Road", "cuisines": ["Continental"], "budget": "high", "preferences": "date night, rooftop"}
    }
]

def run_evals():
    # Make sure we hit the API properly
    for t in TESTS:
        print(f"\n=======================================================")
        print(f"--- Running Test {t['id']}: {t['name']} ---")
        try:
            resp = httpx.post(f"{BASE_URL}/api/recommend", json=t["payload"], timeout=60.0)
            if resp.status_code == 200:
                data = resp.json()
                summary = data.get("summary", "")
                recs = data.get("recommendations", [])
                
                print(f"Summary: {summary}")
                print(f"Found {len(recs)} recommendations.")
                for i, r in enumerate(recs, 1):
                    print(f"  {i}. {r['name']} (Rating: {r['rating']}, Cost: {r['cost_for_two']}) - Confidence: {r.get('confidence', 'N/A')}/10")
                    print(f"     Explanation: {r['ai_explanation']}")
            else:
                print(f"Failed with status: {resp.status_code}")
                print(resp.text)
        except Exception as e:
            print(f"Error calling API: {e}")

if __name__ == "__main__":
    run_evals()
