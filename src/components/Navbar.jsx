import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const categories = [
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
];

const baseLink =
  "px-3 py-2 rounded-full text-sm font-medium transition border border-white/10 hover:border-white/20 hover:bg-white/5";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const isActiveClass = useMemo(
    () => (isActive) =>
      isActive
        ? `${baseLink} bg-white/10 border-white/20`
        : `${baseLink} text-slate-200`,
    []
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-3">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-indigo-500 grid place-items-center font-black">
              N
            </div>
            <div>
              <div className="text-lg font-semibold leading-5">NewsWave</div>
              <div className="text-xs text-slate-400">Modern News Reader</div>
            </div>
          </NavLink>

          <NavLink to="/" className="md:hidden text-slate-300 text-sm hover:text-white">
            Home
          </NavLink>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink to="/" className={({ isActive }) => isActiveClass(isActive)}>
            Top
          </NavLink>

          {categories.map((c) => (
            <NavLink
              key={c.value}
              to={`/category/${c.value}`}
              className={({ isActive }) => isActiveClass(isActive)}
            >
              {c.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <div className="relative w-full md:w-80">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search news..."
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-2.5 pr-10 text-sm outline-none focus:border-white/25"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl px-2 py-1 text-sm text-slate-200 hover:bg-white/10"
              title="Search"
            >
              🔎
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
