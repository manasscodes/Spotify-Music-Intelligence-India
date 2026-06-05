const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function fetchAnalytics() {
  const res = await fetch(`${API_BASE_URL}/analytics/overview`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}

export async function fetchAudioProfiles() {
  const res = await fetch(`${API_BASE_URL}/audio/profiles`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch audio profiles");
  return res.json();
}