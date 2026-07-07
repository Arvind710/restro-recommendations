import json
import os
import logging
import difflib
from models.schemas import RecommendRequest

logger = logging.getLogger(__name__)

# In-memory storage for restaurant data
_restaurants = []
_locations = []
_cuisines = []
_dining_types = []

def load_data():
    global _restaurants, _locations, _cuisines, _dining_types
    data_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'restaurants.json')
    try:
        with open(data_path, 'r', encoding='utf-8') as f:
            _restaurants = json.load(f)
            
        # Extract unique locations and cuisines
        locations_set = set()
        cuisines_set = set()
        dining_types_set = set()
        for r in _restaurants:
            if 'location' in r and r['location']:
                locations_set.add(r['location'])
            if 'cuisines' in r:
                for c in r['cuisines']:
                    if c:
                        cuisines_set.add(c)
            if 'listed_in_type' in r and r['listed_in_type']:
                dining_types_set.add(r['listed_in_type'])
        
        _locations = sorted(list(locations_set))
        _cuisines = sorted(list(cuisines_set))
        _dining_types = sorted(list(dining_types_set))
        logger.info(f"Loaded {len(_restaurants)} restaurants, {len(_locations)} locations, {len(_cuisines)} cuisines.")
    except Exception as e:
        logger.error(f"Failed to load restaurant data: {e}")
        _restaurants = []
        _locations = []
        _cuisines = []

def get_locations():
    return _locations

def get_cuisines():
    return _cuisines

def filter_restaurants(request: RecommendRequest):
    filtered = []
    
    # Pre-process inputs
    req_location_raw = request.location.strip().lower()
    loc_matches = difflib.get_close_matches(req_location_raw, [l.lower() for l in _locations], n=1, cutoff=0.7)
    req_location = loc_matches[0] if loc_matches else req_location_raw
    
    raw_cuisines = [c.strip().lower() for c in request.cuisines if c.strip()]
    req_cuisines = []
    all_cuisines_lower = [c.lower() for c in _cuisines]
    for rc in raw_cuisines:
        c_matches = difflib.get_close_matches(rc, all_cuisines_lower, n=1, cutoff=0.7)
        if c_matches:
            req_cuisines.append(c_matches[0])
        else:
            req_cuisines.append(rc)
            
    req_budget = request.budget
    req_min_rating = request.min_rating
    
    req_dining_type = None
    if request.dining_type:
        dt_raw = request.dining_type.strip().lower()
        all_dt_lower = [d.lower() for d in _dining_types]
        dt_matches = difflib.get_close_matches(dt_raw, all_dt_lower, n=1, cutoff=0.7)
        req_dining_type = dt_matches[0] if dt_matches else dt_raw
        
    req_prefs = request.preferences.strip().lower() if request.preferences else ""
    pref_keywords = [k.strip() for k in req_prefs.split()] if req_prefs else []
    
    for r in _restaurants:
        # 1. Location match
        loc = r.get('location', '').strip().lower()
        if loc != req_location:
            continue
            
        # 2. Cuisines (any overlap if cuisines are provided)
        if req_cuisines:
            r_cuisines = [c.strip().lower() for c in r.get('cuisines', [])]
            if not any(c in r_cuisines for c in req_cuisines):
                continue
                
        # 3. Budget
        cost = r.get('cost_for_two', 0)
        if req_budget == "low" and cost > 500:
            continue
        elif req_budget == "medium" and (cost <= 500 or cost > 1500):
            continue
        elif req_budget == "high" and cost <= 1500:
            continue
            
        # 4. Min Rating
        rating = r.get('rating', 0.0)
        if rating < req_min_rating:
            continue
            
        # 5. Dining Type
        if req_dining_type:
            r_type = r.get('listed_in_type', '').strip().lower()
            if r_type != req_dining_type:
                continue
                
        # 6. Keyword Score
        pref_score = 100  # Base score of 100 for exact match
        if pref_keywords:
            r_name = (r.get('name') or '').lower()
            r_rest_type = (r.get('rest_type') or '').lower()
            r_dish_liked = " ".join([d.lower() for d in (r.get('dish_liked') or []) if d])
            
            for k in pref_keywords:
                if k in r_dish_liked:
                    pref_score += 3
                if k in r_rest_type:
                    pref_score += 2
                if k in r_name:
                    pref_score += 1
                    
        # Add to candidates
        r_copy = r.copy()
        r_copy['_pref_score'] = pref_score
        filtered.append(r_copy)
        
    # High-Quality Fallback: If less than 5 candidates, use weighted scoring to find "next best alternatives"
    if len(filtered) < 5:
        existing_ids = {c.get('id') for c in filtered if 'id' in c}
        fallback_candidates = []
        
        for r in _restaurants:
            loc = (r.get('location') or '').strip().lower()
            if loc != req_location:
                continue
                
            if r.get('id') in existing_ids:
                continue
                
            score = 0
            
            # Cuisines match (+10 points)
            if req_cuisines:
                r_cuisines = [c.strip().lower() for c in (r.get('cuisines') or []) if c]
                if any(c in r_cuisines for c in req_cuisines):
                    score += 10
                    
            # Dining Type match (+5 points)
            if req_dining_type:
                r_type = (r.get('listed_in_type') or '').strip().lower()
                if r_type == req_dining_type:
                    score += 5
                    
            # Budget match (+5 points)
            cost = r.get('cost_for_two') or 0
            budget_match = False
            if req_budget == "low" and cost <= 500:
                budget_match = True
            elif req_budget == "medium" and (500 < cost <= 1500):
                budget_match = True
            elif req_budget == "high" and cost > 1500:
                budget_match = True
            if budget_match:
                score += 5
                
            # Rating bonus
            rating = r.get('rating') or 0.0
            score += rating
            
            # Keyword score
            if pref_keywords:
                r_name = (r.get('name') or '').lower()
                r_rest_type = (r.get('rest_type') or '').lower()
                r_dish_liked = " ".join([d.lower() for d in (r.get('dish_liked') or []) if d])
                
                for k in pref_keywords:
                    if k in r_dish_liked:
                        score += 3
                    if k in r_rest_type:
                        score += 2
                    if k in r_name:
                        score += 1
                        
            r_copy = r.copy()
            r_copy['_pref_score'] = score
            fallback_candidates.append(r_copy)
            
        filtered.extend(fallback_candidates)
                
    # 7. Sort -> pref_score DESC, rating DESC, votes DESC
    filtered.sort(key=lambda x: (x.get('_pref_score', 0), x.get('rating', 0), x.get('votes', 0)), reverse=True)
    
    # 8. Limit
    candidates = filtered[:15]
    
    # Clean up internal fields
    for c in candidates:
        if '_pref_score' in c:
            del c['_pref_score']
            
    return candidates
