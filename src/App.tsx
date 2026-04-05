import { App as RootApp } from "./app/App";
import { QueryProvider } from "./app/providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <RootApp />
    </QueryProvider>
  );
}

export default App;
