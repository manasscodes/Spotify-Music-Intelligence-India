const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE_URL}/analytics/overview`, { 
    cache: 'no-store' // Ensures we always get fresh data from our AI backend
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch analytics data");
  }
  
  return res.json();
}