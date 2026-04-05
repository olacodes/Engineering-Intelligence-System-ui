import { useForm } from "react-hook-form";
import { useFullIndexRunMutation } from "../../api/useIngestionMutations";
import type { FullIndexRunRequest } from "../../../../shared/types/api";
import { IngestionResultCard } from "../IngestionResultCard";

export function FullIndexRunForm() {
  const mutation = useFullIndexRunMutation();
  const { register, handleSubmit } = useForm<FullIndexRunRequest>({
    defaultValues: {
      force_reindex: false,
      refresh_sources: true,
    },
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">Full Index Run</h3>
      <p className="text-sm text-slate-600">
        Re-index all connected knowledge sources. Use this for scheduled
        maintenance or after major schema updates.
      </p>

      <form
        className="space-y-3"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
      >
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            {...register("force_reindex")}
          />
          Force full reindex
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            {...register("refresh_sources")}
          />
          Refresh source metadata
        </label>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {mutation.isPending ? "Submitting..." : "Run Full Index"}
        </button>
      </form>

      <IngestionResultCard
        data={mutation.data}
        isError={mutation.isError}
        errorMessage={mutation.error?.message}
      />
    </section>
  );
}
