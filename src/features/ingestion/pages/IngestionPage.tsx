import { useMemo, useState } from "react";
import { DocsIngestionForm } from "../components/forms/DocsIngestionForm";
import { FullIndexRunForm } from "../components/forms/FullIndexRunForm";
import { PrIngestionForm } from "../components/forms/PrIngestionForm";
import { RepositoryIngestionForm } from "../components/forms/RepositoryIngestionForm";

type IngestionTab = "repository" | "prs" | "docs" | "full-index";

const tabs: Array<{ id: IngestionTab; label: string; description: string }> = [
  {
    id: "repository",
    label: "Repository Ingestion",
    description: "Ingest source code from a repository and branch.",
  },
  {
    id: "prs",
    label: "PR Ingestion",
    description: "Ingest pull requests and optional comments.",
  },
  {
    id: "docs",
    label: "Docs Ingestion",
    description: "Ingest docs from local paths or URLs.",
  },
  {
    id: "full-index",
    label: "Full Index Run",
    description: "Trigger indexing across all connected sources.",
  },
];

export function IngestionPage() {
  const [activeTab, setActiveTab] = useState<IngestionTab>("repository");

  const tabContent = useMemo(() => {
    if (activeTab === "repository") {
      return <RepositoryIngestionForm />;
    }

    if (activeTab === "prs") {
      return <PrIngestionForm />;
    }

    if (activeTab === "docs") {
      return <DocsIngestionForm />;
    }

    return <FullIndexRunForm />;
  }, [activeTab]);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Ingestion Jobs
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Trigger and monitor ingestion workflows for repositories, pull
          requests, docs, and full index runs.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="grid gap-2 md:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg border px-3 py-2 text-left transition ${
                activeTab === tab.id
                  ? "border-cyan-300 bg-cyan-50 text-cyan-900"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <p className="text-sm font-semibold">{tab.label}</p>
              <p className="mt-0.5 text-xs text-slate-500">{tab.description}</p>
            </button>
          ))}
        </div>
      </div>

      {tabContent}
    </section>
  );
}
