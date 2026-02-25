import React from "react";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80";

export default function NewsCard({ article }) {
  const {
    title,
    description,
    url,
    urlToImage,
    source,
    publishedAt,
    author,
  } = article;

  const date = publishedAt ? new Date(publishedAt).toLocaleString() : "";

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/7 transition">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={urlToImage || FALLBACK_IMG}
          alt={title || "news"}
          className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span className="truncate">{source?.name || "Unknown Source"}</span>
          <span className="shrink-0">{date}</span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug">
          {title || "Untitled"}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm text-slate-300">
          {description || "No description available."}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 truncate">
            {author ? `By ${author}` : ""}
          </div>

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium hover:bg-white/15"
          >
            Read Full <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
