import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api/client";
import type { SearchRequest, SearchResponse } from "../../../shared/types/api";

export function useSearchKnowledge(payload: SearchRequest, enabled: boolean) {
  return useQuery({
    queryKey: ["search", payload],
    queryFn: async () => {
      const { data } = await apiClient.post<SearchResponse>(
        "/api/search",
        payload,
      );
      return data;
    },
    enabled,
    placeholderData: (previousData) => previousData,
  });
}
