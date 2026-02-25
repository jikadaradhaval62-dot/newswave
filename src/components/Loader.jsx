import React from "react";

export default function Loader({ label = "Loading..." }) {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      <div className="text-sm text-slate-300">{label}</div>
    </div>
  );
}
