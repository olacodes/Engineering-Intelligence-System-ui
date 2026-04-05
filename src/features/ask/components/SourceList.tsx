interface SourceListProps {
  sources: string[];
}

function sourceLabel(source: string) {
  const clean = source.replace(/^\.*\//, "");
  const parts = clean.split("/");
  const [lastPart] = parts.slice(-1);
  return lastPart || clean;
}

function isHttpLink(value: string) {
  return /^https?:\/\//i.test(value);
}

export function SourceList({ sources }: Readonly<SourceListProps>) {
  if (!sources.length) {
    return (
      <p className="text-sm text-slate-500">
        No sources returned for this answer.
      </p>
    );
  }

  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {sources.map((source, index) => (
        <li
          key={`${source}-${index}`}
          className="rounded-lg border border-slate-200 bg-slate-50/80 p-3"
        >
          <p className="truncate text-sm font-semibold text-slate-900">
            {sourceLabel(source)}
          </p>
          <p className="mt-1 break-all text-xs text-slate-600">{source}</p>
          {isHttpLink(source) ? (
            <a
              href={source}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-xs font-medium text-cyan-700 hover:underline"
            >
              Open source
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
