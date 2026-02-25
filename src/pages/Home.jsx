import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../services/newsApi";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getTopHeadlines({ pageSize: 12 });
      setArticles(data.articles || []);
    } catch (e) {
      setErr(e?.message || "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Top Headlines</h1>
        <p className="mt-1 text-slate-300 text-sm">
          Fresh updates from trusted sources.
        </p>
      </div>

      {loading ? <Loader label="Fetching top headlines..." /> : null}

      {!loading && err ? (
        <ErrorState
          title="Could not load headlines"
          message={err}
          onRetry={load}
        />
      ) : null}

      {!loading && !err ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, idx) => (
            <NewsCard key={`${a.url}-${idx}`} article={a} />
          ))}
        </div>
      ) : null}

      {!loading && !err && articles.length === 0 ? (
        <div className="py-10 text-slate-300">No news found.</div>
      ) : null}
    </section>
  );
}
