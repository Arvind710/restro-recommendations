#!/bin/bash
BACKEND="https://restro-api.up.railway.app"
FRONTEND="https://restro-recs.vercel.app"
PASS=0; FAIL=0

check() {
    local name="$1"; local url="$2"; local expected="$3"
    if curl -sf "$url" | grep -q "$expected"; then
        echo "✅ $name"; ((PASS++))
    else
        echo "❌ $name"; ((FAIL++))
    fi
}

# Backend smoke
check "Backend health" "$BACKEND/api/health" '"status":"ok"'
check "Backend locations" "$BACKEND/api/locations" '"locations"'
check "Backend cuisines" "$BACKEND/api/cuisines" '"cuisines"'

# Frontend smoke
check "Frontend loads" "$FRONTEND" "Bangalore"
check "Frontend has form" "$FRONTEND" "location"

# Full flow
RESULT=$(curl -sf -X POST "$BACKEND/api/recommend" \
    -H "Content-Type: application/json" \
    -d '{"location":"Koramangala","cuisines":["Chinese"],"budget":"medium","min_rating":3.5}')
if echo "$RESULT" | grep -q '"recommendations"'; then
    echo "✅ Full recommendation flow"; ((PASS++))
else
    echo "❌ Full recommendation flow"; ((FAIL++))
fi

echo "————————————————"
echo "Smoke tests: $PASS passed, $FAIL failed"
[ $FAIL -eq 0 ] && exit 0 || exit 1
