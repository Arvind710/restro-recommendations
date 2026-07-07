import json, sys
import os

def validate():
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'restaurants.json')
    if not os.path.exists(data_path):
        print(f"❌ FAILED: {data_path} not found")
        sys.exit(1)

    with open(data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    REQUIRED_FIELDS = ["id","name","address","location","cuisines","cost_for_two","rating","votes","rest_type","online_order","book_table","dish_liked"]
    errors = []

    # Record count
    if not (3000 <= len(data) <= 10000):
        errors.append(f"Record count {len(data)} outside expected range")

    for i, r in enumerate(data):
        # Field presence
        for f in REQUIRED_FIELDS:
            if f not in r:
                errors.append(f"Record {i}: missing field '{f}'")
        # Rating range
        if not (0.0 <= r.get("rating", -1) <= 5.0):
            errors.append(f"Record {i}: rating {r.get('rating')} out of range")
        # Cost type
        if not isinstance(r.get("cost_for_two"), int):
            errors.append(f"Record {i}: cost_for_two is not int")
        # Cuisines type
        if not isinstance(r.get("cuisines"), list):
            errors.append(f"Record {i}: cuisines is not a list")

    # Deduplication
    seen = set()
    for r in data:
        key = (r.get("name", "").lower(), r.get("address","").lower())
        if key in seen:
            errors.append(f"Duplicate: {r['name']} @ {r.get('address','')}")
        seen.add(key)

    if errors:
        print(f"❌ FAILED: {len(errors)} error(s)")
        for e in errors[:20]:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print(f"✅ PASSED: {len(data)} records validated successfully")
        print(f"   Locations: {len(set(r['location'] for r in data))}")
        print(f"   Cuisines:  {len(set(c for r in data for c in r['cuisines']))}")

if __name__ == '__main__':
    validate()
