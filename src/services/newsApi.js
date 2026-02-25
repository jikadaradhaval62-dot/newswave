const ENV_KEY = import.meta.env.VITE_NEWS_API_KEY;

// ✅ Fallback key (your provided key). Recommended: keep key in .env for security.
const FALLBACK_KEY = "a07ce93a78a94777a142b4721b8c7891";

const API_KEY = (ENV_KEY && String(ENV_KEY).trim()) ? ENV_KEY : FALLBACK_KEY;

const BASE_URL = "https://newsapi.org/v2";

function buildUrl(path, params) {
  const url = new URL(`${BASE_URL}/${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      url.searchParams.set(k, v);
    }
  });
  return url.toString();
}

async function request(url) {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Create .env in project root and set VITE_NEWS_API_KEY, then restart dev server."
    );
  }

  const res = await fetch(url);
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  if (data?.status !== "ok") {
    throw new Error(data?.message || "API Error");
  }

  return data;
}

export async function getTopHeadlines({ category, country = "us", pageSize = 12, page = 1 }) {
  const url = buildUrl("top-headlines", {
    apiKey: API_KEY,
    country,
    category,
    pageSize,
    page,
  });
  return request(url);
}

export async function searchNews({ q, pageSize = 12, page = 1, language = "en", sortBy = "publishedAt" }) {
  const url = buildUrl("everything", {
    apiKey: API_KEY,
    q,
    pageSize,
    page,
    language,
    sortBy,
  });
  return request(url);
}
