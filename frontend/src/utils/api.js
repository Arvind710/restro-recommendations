const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function getLocations() {
  const res = await fetch(`${API_URL}/api/locations`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json();
}

export async function getCuisines() {
  const res = await fetch(`${API_URL}/api/cuisines`);
  if (!res.ok) throw new Error('Failed to fetch cuisines');
  return res.json();
}

export async function getRecommendations(preferences) {
  const res = await fetch(`${API_URL}/api/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return res.json();
}
