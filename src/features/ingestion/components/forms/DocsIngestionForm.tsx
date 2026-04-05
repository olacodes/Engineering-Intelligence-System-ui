import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useDocsIngestionMutation } from "../../api/useIngestionMutations";
import type { DocsIngestionRequest } from "../../../../shared/types/api";
import { IngestionResultCard } from "../IngestionResultCard";

export function DocsIngestionForm() {
  const mutation = useDocsIngestionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocsIngestionRequest>({
    defaultValues: {
      docs_path: "",
      docs_name: "engineering-docs",
      max_docs: 250,
      recursive: true,
    },
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">Docs Ingestion</h3>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
      >
        <FormField label="Docs Path or URL" error={errors.docs_path?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="./docs or https://docs.myorg.dev"
            {...register("docs_path", { required: "Docs path is required" })}
          />
        </FormField>

        <FormField label="Docs Name" error={errors.docs_name?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="engineering-docs"
            {...register("docs_name", { required: "Docs name is required" })}
          />
        </FormField>

        <FormField label="Max Docs" error={errors.max_docs?.message}>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            {...register("max_docs", {
              required: "Max docs is required",
              valueAsNumber: true,
              min: { value: 1, message: "Max docs must be at least 1" },
            })}
          />
        </FormField>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            {...register("recursive")}
            className="h-4 w-4 rounded border-slate-300"
          />
          Recursively ingest nested docs
        </label>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {mutation.isPending ? "Submitting..." : "Run Docs Ingestion"}
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
