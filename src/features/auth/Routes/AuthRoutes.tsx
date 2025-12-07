import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import ErrorPage from "../../../utils/errorElements";

const LoginPageLazy = lazy(() => import("../pages/LoginPage"));

const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <LoginPageLazy />,
    errorElement: <ErrorPage />, 

    // children: [
    //   { path: 'login', element: <LoginPage /> },
    //   { path: 'register', element: <RegisterPage /> },
    // ],
  },
];
export default AuthRoutes;
