import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useRepositoryIngestionMutation } from "../../api/useIngestionMutations";
import type { RepositoryIngestionRequest } from "../../../../shared/types/api";
import { IngestionResultCard } from "../IngestionResultCard";

export function RepositoryIngestionForm() {
  const mutation = useRepositoryIngestionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RepositoryIngestionRequest>({
    defaultValues: {
      repo_url: "",
      branch: "main",
      repo_name: "",
      max_files: 500,
    },
  });

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-base font-semibold text-slate-900">
        Repository Ingestion
      </h3>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((values) => mutation.mutate(values))}
      >
        <FormField label="Repository URL" error={errors.repo_url?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="https://github.com/org/repo"
            {...register("repo_url", {
              required: "Repository URL is required",
            })}
          />
        </FormField>

        <FormField label="Branch" error={errors.branch?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="main"
            {...register("branch", { required: "Branch is required" })}
          />
        </FormField>

        <FormField label="Repository Name" error={errors.repo_name?.message}>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="eis-backend"
            {...register("repo_name", {
              required: "Repository name is required",
            })}
          />
        </FormField>

        <FormField label="Max Files" error={errors.max_files?.message}>
          <input
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            {...register("max_files", {
              required: "Max files is required",
              valueAsNumber: true,
              min: { value: 1, message: "Max files must be at least 1" },
            })}
          />
        </FormField>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {mutation.isPending ? "Submitting..." : "Run Repository Ingestion"}
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
