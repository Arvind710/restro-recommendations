#!/bin/bash
BASE="http://localhost:8000"
PASS=0; FAIL=0

run_test() {
    local name="$1"; local cmd="$2"; local expected="$3"
    result=$(eval "$cmd" 2>/dev/null)
    if echo "$result" | grep -q "$expected"; then
        echo "✅ $name"; ((PASS++))
    else
        echo "❌ $name — Expected: $expected"; ((FAIL++))
    fi
}

run_test "Health check" \
    "curl -s $BASE/api/health" '"status":"ok"'

# Note: /api/locations returns an array of strings like ["loc1", "loc2"]. Let's check for an array start.
run_test "Locations returns array" \
    "curl -s $BASE/api/locations" '\['

run_test "Cuisines returns array" \
    "curl -s $BASE/api/cuisines" '\['

run_test "Recommend returns results" \
    "curl -s -X POST $BASE/api/recommend -H 'Content-Type: application/json' -d '{\"location\":\"Koramangala\",\"cuisines\":[\"Chinese\"],\"budget\":\"medium\",\"min_rating\":3.5}'" '"recommendations"'

run_test "Invalid input returns 422" \
    "curl -s -o /dev/null -w '%{http_code}' -X POST $BASE/api/recommend -H 'Content-Type: application/json' -d '{}'" '422'

run_test "Unknown location returns empty" \
    "curl -s -X POST $BASE/api/recommend -H 'Content-Type: application/json' -d '{\"location\":\"Mars\",\"budget\":\"medium\"}'" '"recommendations":\[\]'

echo "————————————————"
echo "Results: $PASS passed, $FAIL failed"
