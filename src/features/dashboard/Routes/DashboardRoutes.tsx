import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const OverViewLazy = lazy(() => import("../pages/OverView"));

const DashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <OverViewLazy />,
    // children: [
    //   { path: 'login', element: <LoginPage /> },
    //   { path: 'register', element: <RegisterPage /> },
    // ],
  },
];

export default DashboardRoutes;
