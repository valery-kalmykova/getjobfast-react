import { Navigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import WorkPage from "../../pages/workPage";
import SuccessLoginPage from "../../pages/successLogin";
import AdminPage from "../../pages/adminPage";

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <WorkPage /> },
      { path: "/login", element: <SuccessLoginPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}