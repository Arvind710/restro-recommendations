import os
import json
import time
import logging
from groq import Groq
import hashlib

logger = logging.getLogger(__name__)

# Cache dictionary: { cache_key: { "timestamp": float, "response": dict } }
_cache = {}
CACHE_TTL = 300 # 5 minutes

def get_cache_key(prompt_messages):
    prompt_str = json.dumps(prompt_messages, sort_keys=True)
    return hashlib.md5(prompt_str.encode('utf-8')).hexdigest()

def get_recommendations(system_message, user_message, max_retries=3):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        logger.warning("GROQ_API_KEY not found. Skipping LLM call.")
        return None
        
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_message}
    ]
    
    cache_key = get_cache_key(messages)
    
    # Check cache
    if cache_key in _cache:
        cache_entry = _cache[cache_key]
        if time.time() - cache_entry["timestamp"] < CACHE_TTL:
            logger.info("Returning cached LLM response.")
            return cache_entry["response"]
            
    try:
        client = Groq(api_key=api_key)
    except Exception as e:
        logger.error(f"Failed to initialize Groq client: {e}")
        return None
    
    delay = 1
    for attempt in range(max_retries):
        try:
            start_time = time.time()
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                temperature=0.7,
                max_tokens=2048,
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            parsed = json.loads(content)
            logger.info(f"Groq API call took {time.time() - start_time:.2f}s")
            
            # Save to cache
            _cache[cache_key] = {
                "timestamp": time.time(),
                "response": parsed
            }
            return parsed
        except Exception as e:
            logger.error(f"Groq API error on attempt {attempt+1}: {e}")
            if attempt < max_retries - 1:
                time.sleep(delay)
                delay *= 2
            else:
                logger.error("Max retries reached for Groq API.")
                return None
