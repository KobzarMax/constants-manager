import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Layout } from "../components/Layout";
import LoginPage from "@/Pages/Login";
import { Spinner } from "../components/Spinner";
import DashboardPage from "@/Pages/Dashboard";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Spinner />}>
            <DashboardPage />
          </Suspense>
        ),
      },
    ],
  },
]);
