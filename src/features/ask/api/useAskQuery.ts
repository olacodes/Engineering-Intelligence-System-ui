import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../shared/api/client";
import type { AskRequest, AskResponse } from "../../../shared/types/api";

export function useAskQuery() {
  return useMutation({
    mutationFn: async (payload: AskRequest) => {
      const { data } = await apiClient.post<AskResponse>("/api/ask", payload);
      return data;
    },
  });
}
