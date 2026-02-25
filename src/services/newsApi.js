async function request(url) {
  const res = await fetch(url);
  const text = await res.text(); // <-- important (HTML 404 parse error avoid)

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || "Invalid response");
  }

  if (!res.ok) throw new Error(data?.message || "API error");
  if (data?.status && data.status !== "ok") throw new Error(data?.message || "API error");

  return { articles: data?.articles || [] };
}

export function getTopHeadlines({ category = "" } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);

  const url = params.toString() ? `/api/news?${params.toString()}` : `/api/news`;
  return request(url);
}

export function searchNews({ q } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);

  return request(`/api/news?${params.toString()}`);
}
