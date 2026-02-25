import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-6xl px-4 text-sm text-slate-400 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} NewsWave</span>
          <span>Built with React + NewsAPI</span>
        </div>
      </footer>
    </div>
  );
}
