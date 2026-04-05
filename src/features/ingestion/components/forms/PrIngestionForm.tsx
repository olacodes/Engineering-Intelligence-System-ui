import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { usePrIngestionMutation } from "../../api/useIngestionMutations";
import type { PrIngestionRequest } from "../../../../shared/types/api";
import { IngestionResultCard } from "../IngestionResultCard";

export function PrIngestionForm() {
  const mutation = usePrIngestionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrIngestionRequest>({
    defaultValues: {
      repo_owner: "",
      repo_name: "",
      max_prs: 50,
      status: "open",
      include_comments: true,
    },
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">PR Ingestion</h3>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
      >
        <FormField label="Repository Owner" error={errors.repo_owner?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="my-org"
            {...register("repo_owner", {
              required: "Repository owner is required",
            })}
          />
        </FormField>

        <FormField label="Repository Name" error={errors.repo_name?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="eis-ui"
            {...register("repo_name", {
              required: "Repository name is required",
            })}
          />
        </FormField>

        <FormField label="Max PRs" error={errors.max_prs?.message}>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            {...register("max_prs", {
              required: "Max PRs is required",
              valueAsNumber: true,
              min: { value: 1, message: "Max PRs must be at least 1" },
            })}
          />
        </FormField>

        <FormField label="Status" error={errors.status?.message}>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            {...register("status")}
          >
            <option value="open">open</option>
            <option value="closed">closed</option>
            <option value="all">all</option>
          </select>
        </FormField>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            {...register("include_comments")}
            className="h-4 w-4 rounded border-slate-300"
          />
          Include PR comments
        </label>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {mutation.isPending ? "Submitting..." : "Run PR Ingestion"}
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

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ label, error, children }: Readonly<FormFieldProps>) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? <span className="text-xs text-rose-700">{error}</span> : null}
    </label>
  );
}
