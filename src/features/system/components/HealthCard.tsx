import type { SystemHealth } from "../../../shared/types/api";

interface HealthCardProps {
  data?: SystemHealth;
  isLoading: boolean;
  errorMessage?: string;
}

function isHealthy(data?: SystemHealth) {
  if (typeof data?.healthy === "boolean") {
    return data.healthy;
  }

  const status = data?.status?.toLowerCase();
  return status === "healthy" || status === "ok" || status === "up";
}

export function HealthCard({
  data,
  isLoading,
  errorMessage,
}: Readonly<HealthCardProps>) {
  const healthy = isHealthy(data);
  const statusText = data?.status ?? (healthy ? "healthy" : "unhealthy");

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Health</h3>
      {isLoading ? (
        <p className="mt-2 text-sm text-slate-500">Loading health...</p>
      ) : null}
      {errorMessage ? (
        <p className="mt-2 text-sm text-rose-700">{errorMessage}</p>
      ) : null}
      {!isLoading && !errorMessage ? (
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${healthy ? "bg-emerald-500" : "bg-rose-500"}`}
            />
            <span className="font-medium uppercase">{statusText}</span>
          </div>
          {data?.version ? <p>Version: {data.version}</p> : null}
          {typeof data?.uptime_seconds === "number" ? (
            <p>Uptime: {data.uptime_seconds}s</p>
          ) : null}
          {data?.message ? <p>Message: {data.message}</p> : null}
        </div>
      ) : null}
    </article>
  );
}
