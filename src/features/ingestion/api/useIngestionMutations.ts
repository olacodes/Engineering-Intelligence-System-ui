import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api/client";
import type {
  DocsIngestionRequest,
  FullIndexRunRequest,
  IngestionResponse,
  PrIngestionRequest,
  RepositoryIngestionRequest,
} from "../../../shared/types/api";

export function useRepositoryIngestionMutation() {
  return useMutation({
    mutationFn: async (payload: RepositoryIngestionRequest) => {
      const { data } = await apiClient.post<IngestionResponse>(
        "/ingest/repository",
        payload,
      );
      return data;
    },
  });
}

export function usePrIngestionMutation() {
  return useMutation({
    mutationFn: async (payload: PrIngestionRequest) => {
      const { data } = await apiClient.post<IngestionResponse>(
        "/ingest/prs",
        payload,
      );
      return data;
    },
  });
}

export function useDocsIngestionMutation() {
  return useMutation({
    mutationFn: async (payload: DocsIngestionRequest) => {
      const { data } = await apiClient.post<IngestionResponse>(
        "/ingest/docs",
        payload,
      );
      return data;
    },
  });
}

export function useFullIndexRunMutation() {
  return useMutation({
    mutationFn: async (payload: FullIndexRunRequest) => {
      const { data } = await apiClient.post<IngestionResponse>(
        "/index/all",
        payload,
      );
      return data;
    },
  });
}
