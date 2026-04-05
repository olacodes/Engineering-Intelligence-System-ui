import type { SystemStats } from "../../../shared/types/api";

interface StatsCardGridProps {
  data?: SystemStats;
  isLoading: boolean;
}

export function StatsCardGrid({
  data,
  isLoading,
}: Readonly<StatsCardGridProps>) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <MetricCard
        title="Total Chunks"
        value={data?.total_chunks}
        isLoading={isLoading}
      />
      <MetricCard
        title="Total Sources"
        value={data?.total_sources}
        isLoading={isLoading}
      />
      <MetricCard
        title="Vector Collection"
        value={data?.vector_collection}
        isLoading={isLoading}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value?: number | string;
  isLoading: boolean;
}

function MetricCard({ title, value, isLoading }: Readonly<MetricCardProps>) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {isLoading ? "..." : (value ?? "N/A")}
      </p>
    </article>
  );
}
