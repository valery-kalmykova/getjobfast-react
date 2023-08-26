import { Navigate } from "react-router-dom";
import StartPage from "../../pages/start";

export default function PublicRoutes() {
  return [
    { path: "/start", element: <StartPage /> },
    { path: "*", element: <Navigate to="/start" replace /> },
  ];
}