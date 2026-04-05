import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api/client";
import type {
  SystemConfig,
  SystemHealth,
  SystemSource,
  SystemSourcesResponse,
  SystemStats,
} from "../../../shared/types/api";

const refetchIntervalMs = 30_000;

function normalizeSourcesResponse(payload: any) {
  const mapItem = (item: any) => {
    if (typeof item === "string") {
      return { id: item, name: item, type: "repository", status: "indexed" };
    }
    return item;
  };

  if (Array.isArray(payload)) {
    return payload.map(mapItem);
  }

  const candidateCollections = [
    payload?.sources,
    payload?.items,
    payload?.data,
    payload?.repos,
    payload?.docs,
  ];

  for (const candidate of candidateCollections) {
    if (Array.isArray(candidate)) {
      return candidate.map(mapItem);
    }
  }

  return [];
}

export function useSystemStats() {
  return useQuery({
    queryKey: ["system", "stats"],
    queryFn: async () => {
      const { data } = await apiClient.get<SystemStats>("/stats");
      return data;
    },
    refetchInterval: refetchIntervalMs,
  });
}

export function useSystemHealth() {
  return useQuery({
    queryKey: ["system", "health"],
    queryFn: async () => {
      const { data } = await apiClient.get<SystemHealth>("/health");
      return data;
    },
    refetchInterval: refetchIntervalMs,
  });
}

export function useSystemSources() {
  return useQuery({
    queryKey: ["system", "sources"],
    queryFn: async () => {
      const { data } = await apiClient.get<
        SystemSource[] | SystemSourcesResponse
      >("/sources");
      return normalizeSourcesResponse(data);
    },
    refetchInterval: refetchIntervalMs,
  });
}

export function useSystemConfig() {
  return useQuery({
    queryKey: ["system", "config"],
    queryFn: async () => {
      const { data } = await apiClient.get<SystemConfig>("/api/config");
      return data;
    },
    refetchInterval: refetchIntervalMs,
  });
}
