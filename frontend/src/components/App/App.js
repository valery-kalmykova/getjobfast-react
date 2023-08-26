import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { SelectedVacanciesContext, UserContext } from "../../utils/context";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PrivateRoutes from "../Routes/PrivateRoutes";
import PublicRoutes from "../Routes/PublicRoutes";
import { useCookies } from "react-cookie";
import { getOwnUser } from "../../utils/api";

function App() {
  const [selectedVacancies, setSelectedVacancies] = useState(null);
  const [userCtx, setUserCtx] = useState(null);

  return (
    <UserContext.Provider value={[userCtx, setUserCtx]}>
      <SelectedVacanciesContext.Provider
        value={[selectedVacancies, setSelectedVacancies]}
      >
        <ApplicationView />
      </SelectedVacanciesContext.Provider>
    </UserContext.Provider>
  );
}

const ApplicationView = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userCtx, setUserCtx] = useContext(UserContext);

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getOwnUser(token);
        if (user) {
          setAuth(true);
          setUserCtx(user)
        }
      } catch (err) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth !== null) {
    const router = createBrowserRouter([
      auth ? PrivateRoutes() : {},
      ...PublicRoutes(),
    ]);
    return <RouterProvider router={router} />;
  }
};

export default App;
