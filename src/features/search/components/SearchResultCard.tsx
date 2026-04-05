import { FileText, ExternalLink, Tag } from "lucide-react";
import type { SearchResult } from "../../../shared/types/api";

interface SearchResultCardProps {
  result: SearchResult;
  highlightTerm: string;
}

function clampScore(score: number) {
  return Math.max(0, Math.min(1, score));
}

function escapeForRegex(value: string) {
  const specialCharacters = new Set([
    ".",
    "*",
    "+",
    "?",
    "^",
    "$",
    "{",
    "}",
    "(",
    ")",
    "|",
    "[",
    "]",
    "\\",
  ]);
  let escaped = "";

  for (const char of value) {
    escaped += specialCharacters.has(char) ? `\\${char}` : char;
  }

  return escaped;
}

function highlightText(text: string, term: string) {
  if (!term.trim()) {
    return text;
  }

  const escaped = escapeForRegex(term);
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === term.toLowerCase()) {
      return (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-yellow-200/80 px-1 py-0.5 font-medium text-slate-900 shadow-sm"
        >
          {part}
        </mark>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function SearchResultCard({
  result,
  highlightTerm,
}: Readonly<SearchResultCardProps>) {
  const normalizedScore = clampScore(result.score);
  const scorePercent = Math.round(normalizedScore * 100);

  return (
    <article className="surface-card group flex flex-col p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
              <FileText size={12} />
              {result.item.source_type || "Document"}
            </span>
            {result.item.repo ? (
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/60">
                {result.item.repo}
              </span>
            ) : null}
          </div>
          <h3 className="break-all text-base font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
            {highlightText(result.item.file_path, highlightTerm)}
          </h3>
        </div>

        <div className="sm:w-36 shrink-0 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Relevance
            </p>
            <p className="text-xs font-bold text-indigo-600">{scorePercent}%</p>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-1000 ease-out"
              style={{ width: `${scorePercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl line-clamp-3">
          {highlightText(result.item.content_preview, highlightTerm)}
        </p>
      </div>

      {result.explanation ? (
        <div className="mt-auto mb-4 rounded-xl border border-indigo-100/50 bg-indigo-50/30 p-3.5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 mb-1">
            AI Context Match
          </p>
          <p className="text-sm font-medium text-slate-700 leading-snug">
            {result.explanation}
          </p>
        </div>
      ) : (
        <div className="mt-auto" />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5">
          {result.item.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-white border border-slate-200 rounded-md px-2 py-0.5 shadow-sm"
            >
              <Tag size={10} className="text-slate-400" />
              {tag}
            </span>
          ))}
        </div>

        {result.item.url ? (
          <a
            href={result.item.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Open Source <ExternalLink size={14} />
          </a>
        ) : null}
      </div>
    </article>
  );
}
