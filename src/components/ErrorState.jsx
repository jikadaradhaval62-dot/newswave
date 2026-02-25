import React from "react";

export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="w-full py-10">
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
        <div className="text-lg font-semibold">{title}</div>
        {message ? <div className="mt-2 text-sm text-slate-200/90">{message}</div> : null}

        {onRetry ? (
          <button
            onClick={onRetry}
            className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15 border border-white/10"
          >
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
