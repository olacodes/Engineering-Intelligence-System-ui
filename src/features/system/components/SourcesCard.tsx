import type { SystemSource } from "../../../shared/types/api";

interface SourcesCardProps {
  data?: SystemSource[];
  isLoading: boolean;
  errorMessage?: string;
}

function getSourceName(source: SystemSource) {
  return source.name ?? source.repo ?? source.path ?? "Unnamed source";
}

function getSourceType(source: SystemSource) {
  return source.type ?? source.source_type ?? "unknown";
}

export function SourcesCard({
  data,
  isLoading,
  errorMessage,
}: Readonly<SourcesCardProps>) {
  const sourceList = Array.isArray(data) ? data : [];

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Sources</h3>
      {isLoading ? (
        <p className="mt-2 text-sm text-slate-500">Loading sources...</p>
      ) : null}
      {errorMessage ? (
        <p className="mt-2 text-sm text-rose-700">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage ? (
        <ul className="mt-3 space-y-2 text-sm">
          {sourceList.map((source, index) => (
            <li
              key={source.id ?? `${getSourceName(source)}-${index}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-900">
                  {getSourceName(source)}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs uppercase text-slate-700">
                  {source.status ?? "indexed"}
                </span>
              </div>
              <p className="mt-1 text-slate-600">{getSourceType(source)}</p>
              {source.path ? (
                <p className="mt-1 break-all text-xs text-slate-500">
                  {source.path}
                </p>
              ) : null}
            </li>
          ))}
          {sourceList.length === 0 ? (
            <li className="text-slate-500">No sources indexed yet.</li>
          ) : null}
        </ul>
      ) : null}
    </article>
  );
}
