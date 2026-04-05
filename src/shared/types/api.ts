export interface AskRequest {
  question: string;
  top_k: number;
}

export interface AskResponse {
  answer: string;
  confidence: number;
  sources: string[];
}

export interface SearchRequest {
  query_text: string;
  repo?: string;
  source_type?: string;
  tags?: string[];
  page?: number;
  page_size?: number;
}

export interface KnowledgeItem {
  id: string;
  file_path: string;
  content_preview: string;
  repo?: string;
  source_type?: string;
  tags?: string[];
  url?: string;
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
  explanation?: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total?: number;
  page?: number;
  page_size?: number;
}

export interface IngestionStats {
  files?: number;
  chunks?: number;
  vectors?: number;
}

export interface IngestionResponse {
  job_id?: string;
  jobId?: string;
  status?: string;
  message?: string;
  duration_seconds?: number;
  duration_ms?: number;
  stats?: IngestionStats;
  [key: string]: unknown;
}

export interface RepositoryIngestionRequest {
  repo_url: string;
  branch: string;
  repo_name: string;
  max_files: number;
}

export interface PrIngestionRequest {
  repo_owner: string;
  repo_name: string;
  max_prs: number;
  status: "open" | "closed" | "all";
  include_comments: boolean;
}

export interface DocsIngestionRequest {
  docs_path: string;
  docs_name: string;
  max_docs: number;
  recursive: boolean;
}

export interface FullIndexRunRequest {
  force_reindex: boolean;
  refresh_sources: boolean;
}

export interface SystemStats {
  total_chunks: number;
  total_sources: number;
  vector_collection: string;
}

export interface SystemHealth {
  status?: string;
  healthy?: boolean;
  message?: string;
  version?: string;
  uptime_seconds?: number;
}

export interface SystemSource {
  id?: string;
  name?: string;
  repo?: string;
  path?: string;
  type?: string;
  source_type?: string;
  status?: string;
}

export type SystemConfig = Record<string, unknown>;

export interface SystemSourcesResponse {
  sources?: SystemSource[];
  repos?: SystemSource[];
  docs?: SystemSource[];
  items?: SystemSource[];
  data?: SystemSource[];
  [key: string]: unknown;
}
