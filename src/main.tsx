import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { registerServiceWorker } from "./utils/registerSW";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./Routes.tsx";


// Register service worker
registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* ❗ RouterProvider خودش BrowserRouter داخلی دارد */}
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
