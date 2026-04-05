import { Activity, RefreshCcw } from "lucide-react";
import {
  useSystemConfig,
  useSystemHealth,
  useSystemSources,
  useSystemStats,
} from "../api/useSystemOverview";
import { ConfigCard } from "../components/ConfigCard";
import { HealthCard } from "../components/HealthCard";
import { SourcesCard } from "../components/SourcesCard";
import { StatsCardGrid } from "../components/StatsCardGrid";

export function SystemPage() {
  const stats = useSystemStats();
  const health = useSystemHealth();
  const sources = useSystemSources();
  const config = useSystemConfig();

  const isRefreshing =
    stats.isFetching ||
    health.isFetching ||
    sources.isFetching ||
    config.isFetching;

  const handleRefresh = async () => {
    await Promise.all([
      stats.refetch(),
      health.refetch(),
      sources.refetch(),
      config.refetch(),
    ]);
  };

  return (
    <section className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/40 p-5 rounded-2xl border border-indigo-100/50 backdrop-blur-sm shadow-sm ring-1 ring-white/60">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-200/50">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-indigo-950">
              System Dashboard
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 font-medium flex items-center gap-2">
              <span>Monitor health, metrics, and remote sources.</span>
              <span className="hidden sm:inline-block text-slate-300">•</span>
              <span className="text-[11px] uppercase tracking-widest text-emerald-500 font-bold hidden sm:inline-block">
                Auto-refresh 30s
              </span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            void handleRefresh();
          }}
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 transition-all hover:bg-slate-50 hover:text-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCcw
            size={16}
            className={isRefreshing ? "animate-spin text-indigo-500" : ""}
          />
          {isRefreshing ? "Syncing..." : "Refresh Status"}
        </button>
      </div>

      <div className="space-y-6 lg:space-y-8">
        <StatsCardGrid data={stats.data} isLoading={stats.isLoading} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="surface-card flex flex-col p-6 hover:shadow-md transition-shadow">
            <HealthCard
              data={health.data}
              isLoading={health.isLoading}
              errorMessage={health.isError ? health.error.message : undefined}
            />
          </div>

          <div className="surface-card flex flex-col p-6 hover:shadow-md transition-shadow">
            <ConfigCard
              data={config.data}
              isLoading={config.isLoading}
              errorMessage={config.isError ? config.error.message : undefined}
            />
          </div>
        </div>

        <div className="surface-card p-6 min-h-[300px]">
          <SourcesCard
            data={sources.data}
            isLoading={sources.isLoading}
            errorMessage={sources.isError ? sources.error.message : undefined}
          />
        </div>
      </div>
    </section>
  );
}
