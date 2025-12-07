// routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./features/auth/Routes/AuthRoutes";
import DashboardRoutes from "./features/dashboard/Routes/DashboardRoutes";

export const router = createBrowserRouter([
  ...AuthRoutes,
  ...DashboardRoutes,
  // ... other feature routes
]);
