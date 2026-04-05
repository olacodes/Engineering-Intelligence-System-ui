import { useMemo, useState } from "react";
import { useSearchKnowledge } from "../api/useSearchKnowledge";
import { SearchResultCard } from "../components/SearchResultCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import {
  Search,
  Filter,
  Hash,
  GitBranch,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export function SearchPage() {
  const [queryText, setQueryText] = useState("");
  const [repoFilter, setRepoFilter] = useState("");
  const [sourceTypeFilter, setSourceTypeFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQueryText = useDebouncedValue(queryText, 450);
  const debouncedRepo = useDebouncedValue(repoFilter, 450);
  const debouncedSourceType = useDebouncedValue(sourceTypeFilter, 450);
  const debouncedTags = useDebouncedValue(tagsFilter, 450);

  const normalizedTags = useMemo(() => {
    return debouncedTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [debouncedTags]);

  const payload = useMemo(
    () => ({
      query_text: debouncedQueryText.trim(),
      repo: debouncedRepo.trim() || undefined,
      source_type: debouncedSourceType.trim() || undefined,
      tags: normalizedTags.length ? normalizedTags : undefined,
      page,
      page_size: 10,
    }),
    [
      debouncedQueryText,
      debouncedRepo,
      debouncedSourceType,
      normalizedTags,
      page,
    ],
  );

  const shouldSearch = payload.query_text.length > 0;
  const searchKnowledge = useSearchKnowledge(payload, shouldSearch);

  const responsePage = searchKnowledge.data?.page ?? page;
  const totalResults = searchKnowledge.data?.total ?? 0;
  const pageSize = searchKnowledge.data?.page_size ?? payload.page_size;
  const hasNextPage = totalResults > responsePage * pageSize;

  const resetToFirstPage = () => {
    setPage(1);
  };

  return (
    <section className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5">
        <h2 className="flex items-center gap-2 text-2xl lg:text-3xl font-bold tracking-tight text-indigo-950">
          <Search className="text-cyan-500" size={28} />
          Knowledge Global Search
        </h2>
        <p className="text-sm lg:text-base text-slate-500 max-w-2xl leading-relaxed">
          Query indexed engineering knowledge with cross-repository,
          source-type, and tag filtering capabilities.
        </p>
      </div>

      <div className="surface-card p-5 lg:p-6 lg:pb-5 space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={queryText}
            onChange={(event) => {
              setQueryText(event.target.value);
              resetToFirstPage();
            }}
            placeholder="Search architecture decisions, incidents, runbooks..."
            className="w-full rounded-xl border-0 bg-slate-50/50 py-3.5 pl-11 pr-4 text-[15px] text-slate-900 shadow-inner ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <GitBranch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              value={repoFilter}
              onChange={(event) => {
                setRepoFilter(event.target.value);
                resetToFirstPage();
              }}
              placeholder="e.g. eis-backend"
              className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
            <span className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest rounded-sm">
              Repo
            </span>
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              value={sourceTypeFilter}
              onChange={(event) => {
                setSourceTypeFilter(event.target.value);
                resetToFirstPage();
              }}
              placeholder="repo, pr, docs"
              className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
            <span className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest rounded-sm">
              Type
            </span>
          </div>
          <div className="relative">
            <Hash
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              value={tagsFilter}
              onChange={(event) => {
                setTagsFilter(event.target.value);
                resetToFirstPage();
              }}
              placeholder="react, api..."
              className="w-full rounded-lg border-0 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
            <span className="absolute -top-2 left-2.5 bg-white px-1 text-[10px] font-semibold text-slate-500 uppercase tracking-widest rounded-sm">
              Tags
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500 bg-slate-50/50 rounded-lg py-1.5 px-3 w-fit border border-slate-100">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Live filtering debounced automatically
        </div>
      </div>

      <div className="space-y-4 relative min-h-[200px]">
        {searchKnowledge.isLoading && shouldSearch && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10 rounded-xl">
            <div className="flex items-center gap-3 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-xl">
              <Search className="animate-spin text-cyan-400" size={16} />
              Searching Knowledge Base...
            </div>
          </div>
        )}

        {searchKnowledge.isError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-5 text-sm font-medium text-rose-800 shadow-sm flex items-center gap-3">
            <div className="w-1.5 h-full rounded-full bg-rose-500 flex-shrink-0" />
            {searchKnowledge.error.message}
          </div>
        )}

        <div className="space-y-4">
          {searchKnowledge.data?.results.map((result) => (
            <div
              key={result.item.id}
              className="transition-all duration-300 hover:translate-y-[-2px]"
            >
              <SearchResultCard
                result={result}
                highlightTerm={payload.query_text}
              />
            </div>
          ))}

          {shouldSearch &&
            !searchKnowledge.isLoading &&
            !searchKnowledge.data?.results.length &&
            !searchKnowledge.isError && (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
                <Search className="text-slate-300 mb-3" size={40} />
                <p className="text-base font-semibold text-slate-700">
                  No matching knowledge found
                </p>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Try using different keywords, or broaden your search by
                  removing some filters.
                </p>
              </div>
            )}
        </div>
      </div>

      {shouldSearch && (searchKnowledge.data?.results.length ?? 0) > 0 && (
        <div className="surface-card flex items-center justify-between p-3.5 mt-8">
          <div className="text-sm font-semibold text-slate-600 pl-2">
            Page {responsePage} <span className="text-slate-300 mx-2">|</span>
            <span className="text-indigo-600">{totalResults}</span> total result
            {totalResults === 1 ? "" : "s"}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.max(1, currentPage - 1))
              }
              disabled={page <= 1 || searchKnowledge.isFetching}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:text-slate-700"
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((currentPage) => currentPage + 1)}
              disabled={!hasNextPage || searchKnowledge.isFetching}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-indigo-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:text-slate-700"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
