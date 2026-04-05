import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 30_000, // 30s timeout for production readiness
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // e.g., const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Catch common HTTP errors (401, 403, 500)
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle unauthenticated (e.g., redirect to login)
      } else if (status === 403) {
        // Handle unauthorized
      } else if (status >= 500) {
        // Handle server errors globally
      }
    } else if (error.request) {
      // Network error (no response)
      console.error("Network error. Backend might be unreachable.");
    }

    const message =
      error?.response?.data?.detail ?? error?.message ?? "Request failed";
    return Promise.reject(new Error(message));
  },
);
