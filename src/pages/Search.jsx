import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import NewsCard from "../components/NewsCard";
import { searchNews } from "../services/newsApi";

export default function Search() {
  const [params] = useSearchParams();
  const q = useMemo(() => (params.get("q") || "").trim(), [params]);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    if (!q) {
      setArticles([]);
      setLoading(false);
      setErr("");
      return;
    }

    setLoading(true);
    setErr("");
    try {
      const data = await searchNews({ q, pageSize: 12 });
      setArticles(data.articles || []);
    } catch (e) {
      setErr(e?.message || "Failed to search news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Search</h1>
        <p className="mt-1 text-slate-300 text-sm">
          Results for: <span className="text-white font-semibold">{q || "—"}</span>
        </p>
      </div>

      {loading ? <Loader label="Searching news..." /> : null}

      {!loading && err ? (
        <ErrorState title="Search failed" message={err} onRetry={load} />
      ) : null}

      {!loading && !err ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, idx) => (
            <NewsCard key={`${a.url}-${idx}`} article={a} />
          ))}
        </div>
      ) : null}

      {!loading && !err && q && articles.length === 0 ? (
        <div className="py-10 text-slate-300">No results found.</div>
      ) : null}

      {!loading && !err && !q ? (
        <div className="py-10 text-slate-300">Type a query in the search box above.</div>
      ) : null}
    </section>
  );
}
