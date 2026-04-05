import { FormEvent, useEffect, useRef, useState } from "react";
import { Sparkles, Send, Trash2, Library } from "lucide-react";
import { AnswerCard } from "../components/AnswerCard";
import { useAskQuery } from "../api/useAskQuery";

const topKOptions = [3, 5, 8, 10];

export function AskPage() {
  const [question, setQuestion] = useState("");
  const [topK, setTopK] = useState(5);
  const [copyState, setCopyState] = useState<"idle" | "done">("idle");
  const answerRef = useRef<HTMLDivElement | null>(null);

  const askQuery = useAskQuery();

  useEffect(() => {
    if (askQuery.data) {
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [askQuery.data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || askQuery.isPending) {
      return;
    }

    setCopyState("idle");
    askQuery.mutate({ question: trimmedQuestion, top_k: topK });
  };

  const handleClear = () => {
    if (askQuery.isPending) {
      return;
    }

    setQuestion("");
    setCopyState("idle");
    askQuery.reset();
  };

  const handleCopy = async () => {
    if (!askQuery.data?.answer) {
      return;
    }

    await navigator.clipboard.writeText(askQuery.data.answer);
    setCopyState("done");
    globalThis.setTimeout(() => setCopyState("idle"), 1500);
  };

  return (
    <section className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1.5 pl-1">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">
          <Sparkles className="text-cyan-500" size={28} />
          Ask Engineering AI
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Ask about code, architecture, incidents, and runbooks and get deeply
          grounded answers from your engineering intelligence graph.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="surface-card p-5 lg:p-6 space-y-5"
      >
        <div className="space-y-2">
          <label
            className="flex items-center gap-1.5 text-sm font-bold text-slate-700"
            htmlFor="question-input"
          >
            <Library size={16} className="text-indigo-400" />
            Your Question
          </label>
          <div className="relative">
            <textarea
              id="question-input"
              className="min-h-36 w-full resize-y rounded-2xl border-0 bg-slate-50/50 p-4 text-[15px] leading-relaxed text-slate-900 shadow-inner ring-1 ring-inset ring-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all placeholder:text-slate-400"
              placeholder="e.g., What changed in the payments retry policy, and which services are affected?"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              disabled={askQuery.isPending}
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100/80 pt-5">
          <div className="flex items-center gap-3">
            <label
              className="text-xs font-bold uppercase tracking-widest text-slate-500"
              htmlFor="top-k-select"
            >
              Context Scope
            </label>
            <select
              id="top-k-select"
              value={topK}
              onChange={(event) => setTopK(Number(event.target.value))}
              className="h-10 rounded-xl border-0 bg-slate-50 py-0 pl-3 pr-8 text-sm font-semibold text-indigo-900 ring-1 ring-inset ring-slate-200 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer transition-all disabled:opacity-50"
              disabled={askQuery.isPending}
            >
              {topKOptions.map((option) => (
                <option key={option} value={option}>
                  Top {option} sources
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleClear}
              disabled={askQuery.isPending || !question}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 size={16} />
              Clear
            </button>
            <button
              type="submit"
              disabled={askQuery.isPending || !question.trim()}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:from-indigo-700 hover:to-cyan-700 active:scale-95 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none"
            >
              {askQuery.isPending ? (
                <>
                  <Sparkles className="animate-pulse" size={16} /> Reasoning...
                </>
              ) : (
                <>
                  <Send size={16} /> Ask AI
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {askQuery.isPending ? (
        <div className="surface-card p-6 border-indigo-100">
          <div className="flex items-center gap-3 text-sm font-bold text-indigo-700">
            <div className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
            </div>
            EIS is reasoning over retrieved context...
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded-lg bg-indigo-50/80" />
            <div className="h-4 w-11/12 animate-pulse rounded-lg bg-indigo-50/80" />
            <div className="h-4 w-9/12 animate-pulse rounded-lg bg-indigo-50/80" />
            <div className="h-4 w-8/12 animate-pulse rounded-lg bg-indigo-50/80" />
          </div>
        </div>
      ) : null}

      {askQuery.isError ? (
        <div className="surface-card border-rose-200 bg-rose-50/50 p-5 text-rose-800 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold">
            <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            Could not generate answer
          </p>
          <p className="mt-2 text-sm font-medium text-rose-600/90 bg-white/50 p-3 rounded-lg border border-rose-100">
            {askQuery.error.message}
          </p>
        </div>
      ) : null}

      <div ref={answerRef} className="pb-10">
        {askQuery.data ? (
          <AnswerCard
            response={askQuery.data}
            onCopy={handleCopy}
            copyState={copyState}
          />
        ) : null}
      </div>
    </section>
  );
}
