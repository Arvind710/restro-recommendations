import httpx
import time

BASE_URL = "http://localhost:8000"

def test_caching():
    print("--- Caching Evaluation ---")
    payload = {"location": "Koramangala", "cuisines": ["Chinese"], "budget": "medium", "min_rating": 3.5}
    
    # First request
    start = time.time()
    resp1 = httpx.post(f"{BASE_URL}/api/recommend", json=payload, timeout=30.0)
    dur1 = time.time() - start
    print(f"Request 1 took: {dur1:.2f}s")
    
    # Second request
    start = time.time()
    resp2 = httpx.post(f"{BASE_URL}/api/recommend", json=payload, timeout=30.0)
    dur2 = time.time() - start
    print(f"Request 2 took: {dur2:.2f}s")
    
    if dur2 < dur1 * 0.5:
        print("✅ Cache hit successful (Request 2 was significantly faster).")
    else:
        print("❌ Cache did not seem to speed up Request 2.")

def test_edge_cases():
    print("\n--- Edge Case Evaluation ---")
    
    # A18: Budget "low" in expensive area
    payload_exp = {"location": "MG Road", "budget": "low"}
    resp = httpx.post(f"{BASE_URL}/api/recommend", json=payload_exp, timeout=30.0)
    if resp.status_code == 200:
        recs = resp.json().get("recommendations", [])
        print(f"✅ Budget 'low' in MG Road returned {len(recs)} results (graceful handling).")
        
    # A14: min_rating out of range
    payload_rating = {"location": "Koramangala", "min_rating": 7.0}
    resp = httpx.post(f"{BASE_URL}/api/recommend", json=payload_rating, timeout=30.0)
    if resp.status_code == 422:
        print(f"✅ min_rating=7.0 correctly returned 422 Validation Error.")
        
    # A15: cuisines > 5 items
    payload_cuisines = {"location": "Koramangala", "cuisines": ["A", "B", "C", "D", "E", "F"]}
    resp = httpx.post(f"{BASE_URL}/api/recommend", json=payload_cuisines, timeout=30.0)
    if resp.status_code == 422:
        print(f"✅ cuisines > 5 correctly returned 422 Validation Error.")

if __name__ == "__main__":
    test_caching()
    test_edge_cases()
