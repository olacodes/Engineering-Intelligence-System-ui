import type { IngestionResponse } from "../../../shared/types/api";

interface IngestionResultCardProps {
  data?: IngestionResponse;
  errorMessage?: string;
  isError: boolean;
}

function toNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return undefined;
}

function getStats(data?: IngestionResponse) {
  const statsObject =
    typeof data?.stats === "object" && data.stats !== null ? data.stats : {};

  const files =
    toNumber(statsObject.files) ??
    toNumber(data?.files_indexed) ??
    toNumber(data?.files);
  const chunks =
    toNumber(statsObject.chunks) ??
    toNumber(data?.chunks_indexed) ??
    toNumber(data?.chunks);
  const vectors =
    toNumber(statsObject.vectors) ??
    toNumber(data?.vectors_indexed) ??
    toNumber(data?.vectors);

  return { files, chunks, vectors };
}

function getDuration(data?: IngestionResponse) {
  const seconds = toNumber(data?.duration_seconds);
  if (seconds !== undefined) {
    return `${seconds.toFixed(2)}s`;
  }

  const milliseconds = toNumber(data?.duration_ms);
  if (milliseconds !== undefined) {
    return `${(milliseconds / 1000).toFixed(2)}s`;
  }

  return "N/A";
}

export function IngestionResultCard({
  data,
  errorMessage,
  isError,
}: Readonly<IngestionResultCardProps>) {
  if (isError) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
        <p className="font-semibold">Ingestion job failed.</p>
        <p className="mt-1">{errorMessage ?? "Unknown error"}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const stats = getStats(data);
  const duration = getDuration(data);
  const jobId = data.job_id ?? data.jobId ?? "N/A";
  const status = data.status ?? "queued";

  return (
    <article className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
      <div>
        <p className="text-sm font-semibold text-emerald-900">
          Ingestion job submitted
        </p>
        <p className="mt-1 text-xs text-emerald-800">
          Job ID: {jobId} | Status: {status}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <Metric label="Files" value={stats.files} />
        <Metric label="Chunks" value={stats.chunks} />
        <Metric label="Vectors" value={stats.vectors} />
        <Metric label="Duration" value={duration} />
      </div>

      <details className="rounded-lg border border-emerald-300 bg-white p-3">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-emerald-900">
          JSON Response Summary
        </summary>
        <pre className="mt-2 overflow-x-auto text-xs text-slate-800">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </article>
  );
}

interface MetricProps {
  label: string;
  value: number | string | undefined;
}

function Metric({ label, value }: Readonly<MetricProps>) {
  return (
    <div className="rounded-lg border border-emerald-300 bg-white p-2">
      <p className="text-[11px] uppercase tracking-wide text-slate-600">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-900">{value ?? "N/A"}</p>
    </div>
  );
}
