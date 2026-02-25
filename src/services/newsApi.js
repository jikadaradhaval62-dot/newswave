async function request(url) {
  const res = await fetch(url);
  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.message || "API error");
  if (data?.status && data.status !== "ok") throw new Error(data?.message || "API error");

  return { articles: data?.articles || [] };
}

export function getTopHeadlines({ category = "" } = {}) {
  const url = category ? `/api/news?category=${encodeURIComponent(category)}` : `/api/news`;
  return request(url);
}

export function searchNews({ q }) {
  return request(`/api/news?q=${encodeURIComponent(q || "")}`);
}
