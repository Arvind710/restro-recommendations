#!/bin/bash
echo "Evaluating Backend Deployment Configuration..."

PASS=0
FAIL=0

if [ -f "backend/Procfile" ]; then
    echo "✅ Procfile exists"
    ((PASS++))
else
    echo "❌ Procfile is missing"
    ((FAIL++))
fi

if [ -f "backend/runtime.txt" ]; then
    echo "✅ runtime.txt exists"
    ((PASS++))
else
    echo "❌ runtime.txt is missing"
    ((FAIL++))
fi

if grep -q "uvicorn main:app" "backend/Procfile"; then
    echo "✅ Procfile contains correct uvicorn command"
    ((PASS++))
else
    echo "❌ Procfile command is incorrect"
    ((FAIL++))
fi

echo "————————————————"
echo "Deployment config evaluation: $PASS passed, $FAIL failed"
