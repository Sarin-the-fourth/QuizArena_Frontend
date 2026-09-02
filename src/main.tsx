import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toast.tsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

AOS.init();
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </Toaster>
    </QueryClientProvider>
  </StrictMode>
);
