const API_BASE_URL = "https://spotify-india-api.onrender.com/api/v1";

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

export async function fetchForecastData() {
  const res = await fetch(`${API_BASE_URL}/forecast/trends`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch forecast data");
  return res.json();
}

export async function fetchQualityReport() {
  const res = await fetch(`${API_BASE_URL}/quality/report`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch quality report");
  return res.json();
}

export async function fetchArtistIntelligence() {
  const res = await fetch(`${API_BASE_URL}/artists/intelligence`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch artist intelligence");
  return res.json();
}