import type { SystemConfig } from "../../../shared/types/api";

interface ConfigCardProps {
  data?: SystemConfig;
  isLoading: boolean;
  errorMessage?: string;
}

function maskSensitiveConfig(config: SystemConfig | undefined) {
  if (!config) {
    return {};
  }

  const sensitiveKeys = ["key", "token", "secret", "password", "credential"];
  const result: Record<string, unknown> = {};

  for (const [configKey, value] of Object.entries(config)) {
    const keyLower = configKey.toLowerCase();
    const isSensitive = sensitiveKeys.some((sensitiveKey) =>
      keyLower.includes(sensitiveKey),
    );

    result[configKey] = isSensitive ? "***" : value;
  }

  return result;
}

export function ConfigCard({
  data,
  isLoading,
  errorMessage,
}: Readonly<ConfigCardProps>) {
  const safeConfig = maskSensitiveConfig(data);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Config Viewer</h3>
      {isLoading ? (
        <p className="mt-2 text-sm text-slate-500">Loading config...</p>
      ) : null}
      {errorMessage ? (
        <p className="mt-2 text-sm text-rose-700">{errorMessage}</p>
      ) : null}

      {!isLoading && !errorMessage ? (
        <pre className="mt-3 max-h-72 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800">
          {JSON.stringify(safeConfig, null, 2)}
        </pre>
      ) : null}
    </article>
  );
}
