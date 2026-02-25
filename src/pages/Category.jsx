import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import NewsCard from "../components/NewsCard";
import { getTopHeadlines } from "../services/newsApi";

const pretty = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

export default function Category() {
  const { category } = useParams();
  const title = useMemo(() => pretty(category), [category]);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await getTopHeadlines({ category, pageSize: 12 });
      setArticles(data.articles || []);
    } catch (e) {
      setErr(e?.message || "Failed to fetch category news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{title} News</h1>
        <p className="mt-1 text-slate-300 text-sm">
          Latest {title.toLowerCase()} headlines.
        </p>
      </div>

      {loading ? <Loader label={`Fetching ${title} news...`} /> : null}

      {!loading && err ? (
        <ErrorState
          title={`Could not load ${title} news`}
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
        <div className="py-10 text-slate-300">No news found for this category.</div>
      ) : null}
    </section>
  );
}
