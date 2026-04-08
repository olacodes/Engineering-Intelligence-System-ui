export const navigationItems = [
  { label: "Ask", path: "/ask", description: "Query engineering knowledge" },
  // { label: "Search", path: "/search", description: "Search indexed sources" },
  {
    label: "Ingestion",
    path: "/ingestion",
    description: "Trigger ingestion jobs",
  },
  {
    label: "System",
    path: "/system",
    description: "Stats, health, and sources",
  },
] as const;
