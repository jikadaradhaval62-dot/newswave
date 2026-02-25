export default async function handler(req, res) {
  try {
    const category = req.query.category || "";
    const q = req.query.q || "";

    const key = process.env.NEWS_API_KEY; // ✅ Vercel env
    if (!key) return res.status(500).json({ message: "NEWS_API_KEY missing" });

    let url = "";

    if (q) {
      url =
        "https://newsapi.org/v2/everything" +
        `?q=${encodeURIComponent(q)}` +
        `&pageSize=12` +
        `&language=en` +
        `&sortBy=publishedAt` +
        `&apiKey=${key}`;
    } else {
      url =
        "https://newsapi.org/v2/top-headlines" +
        `?country=in` +
        `&pageSize=12` +
        `&apiKey=${key}` +
        (category ? `&category=${category}` : "");
    }

    const r = await fetch(url);
    const data = await r.json();

    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ message: e?.message || "Server error" });
  }
}
