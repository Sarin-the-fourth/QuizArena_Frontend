import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/Router";
import { refreshInstance } from "./api/axios";
import { Spinner } from "./components/ui/spinner";

function App() {
  const [backendReady, setBackendReady] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    let active = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const checkBackend = async () => {
      while (active) {
        try {
          await refreshInstance.get("/health", { timeout: 5000 });
          if (active) setBackendReady(true);
          return;
        } catch {
          if (!active) return;
          setIsRetrying(true);
          await new Promise<void>((resolve) => {
            retryTimer = setTimeout(resolve, 1500);
          });
        }
      }
    };

    void checkBackend();

    return () => {
      active = false;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  if (!backendReady) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-5 bg-background px-6 text-center">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-primary shadow-lg shadow-primary/20">
          <span className="font-Outfit text-4xl font-bold text-black">Q</span>
        </div>
        <div className="space-y-2">
          <h1 className="m-0 text-3xl font-semibold tracking-tight md:text-4xl">
            {isRetrying ? "Waking up Quiz Arena" : "Getting Quiz Arena ready"}
          </h1>
          <p className="m-0 max-w-sm text-sm text-muted-foreground md:text-base">
            Connecting to the game server. This should only take a moment.
          </p>
        </div>
        <Spinner className="size-6 text-foreground" />
        <span className="sr-only" role="status" aria-live="polite">
          {isRetrying ? "Waiting for the backend to become ready" : "Connecting to backend"}
        </span>
      </main>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
