import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Check, Copy, BookOpen, ChevronRight } from "lucide-react";
import type { AskResponse } from "../../../shared/types/api";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { SourceList } from "./SourceList";

interface AnswerCardProps {
  response: AskResponse;
  onCopy: () => void;
  copyState: "idle" | "done";
}

interface ParsedSection {
  title: string;
  body: string;
}

function parseAnswerSections(answer: string) {
  const normalized = answer.split("\r\n").join("\n").trim();
  if (!normalized) {
    return [] as ParsedSection[];
  }

  const lines = normalized.split("\n");
  const sections: ParsedSection[] = [];
  let currentTitle = "Overview";
  let currentBody: string[] = [];

  const pushCurrentSection = () => {
    const joinedBody = currentBody.join("\n").trim();
    if (joinedBody) {
      sections.push({ title: currentTitle, body: joinedBody });
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const isHeading =
      /^[A-Z][A-Z0-9_ /-]{2,}$/.test(line) && !line.startsWith("-");

    if (isHeading) {
      pushCurrentSection();
      currentTitle = line.split("_").join(" ");
      currentBody = [];
      continue;
    }

    currentBody.push(rawLine);
  }

  pushCurrentSection();
  return sections;
}

export function AnswerCard({
  response,
  onCopy,
  copyState,
}: Readonly<AnswerCardProps>) {
  const previewSources = useMemo(
    () => response.sources.slice(0, 3),
    [response.sources],
  );
  const parsedSections = useMemo(
    () => parseAnswerSections(response.answer),
    [response.answer],
  );
  const hasStructuredSections = parsedSections.length > 1;

  return (
    <article className="surface-card space-y-6 lg:space-y-8 p-5 sm:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 via-white to-cyan-50/50 p-5 shadow-sm">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-cyan-100/50 blur-2xl"></div>
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-indigo-950">
                AI Answer Synthesis
              </h3>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                Based on context
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ConfidenceBadge confidence={response.confidence} />
            <button
              type="button"
              onClick={onCopy}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all shadow-sm ${
                copyState === "done"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-indigo-600 active:scale-95"
              }`}
            >
              {copyState === "done" ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
              {copyState === "done" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <div className="px-1 lg:px-2">
        {hasStructuredSections ? (
          <div className="grid gap-6">
            {parsedSections.map((section) => (
              <section
                key={section.title}
                className="answer-section-card rounded-2xl border border-slate-100 bg-white p-5 pl-6 sm:p-6 sm:pl-8 shadow-sm"
              >
                <div className="mb-4 flex items-center">
                  <span className="flex items-center gap-1.5 rounded-lg bg-indigo-50/80 px-3 py-1.5 text-xs font-black uppercase tracking-widest text-indigo-600 border border-indigo-100/50">
                    <ChevronRight size={14} className="text-indigo-400" />{" "}
                    {section.title}
                  </span>
                </div>
                <div className="answer-markdown text-[15px]">
                  <ReactMarkdown>{section.body}</ReactMarkdown>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="answer-markdown rounded-2xl border border-slate-100 bg-white p-5 sm:p-8 shadow-sm text-[15px]">
            <ReactMarkdown>{response.answer}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className="border-t border-slate-100/80 pt-6 px-1 lg:px-2">
        <section className="space-y-4">
          <h4 className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-500">
              <BookOpen size={12} />
            </span>
            Context References
          </h4>
          <SourceList sources={previewSources} />
        </section>

        {response.sources.length > 3 ? (
          <section className="mt-8 space-y-4">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center before:content-[''] before:flex-1 before:h-px before:bg-slate-100 before:mr-3 after:content-[''] after:flex-1 after:h-px after:bg-slate-100 after:ml-3">
              Additional Sources
            </h4>
            <div className="opacity-80 hover:opacity-100 transition-opacity">
              <SourceList sources={response.sources.slice(3)} />
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
