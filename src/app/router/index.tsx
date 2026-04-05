import { Navigate, createBrowserRouter } from "react-router-dom";
import { RouteErrorBoundary } from "../errors/RouteErrorBoundary";
import { AppLayout } from "../layout/AppLayout";
import { AskPage } from "../../features/ask/pages/AskPage";
import { SearchPage } from "../../features/search/pages/SearchPage";
import { IngestionPage } from "../../features/ingestion/pages/IngestionPage";
import { SystemPage } from "../../features/system/pages/SystemPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/ask" replace />,
      },
      {
        path: "ask",
        element: <AskPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "ingestion",
        element: <IngestionPage />,
      },
      {
        path: "system",
        element: <SystemPage />,
      },
    ],
  },
]);
