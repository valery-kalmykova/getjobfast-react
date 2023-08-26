import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StartPage from "../../pages/start";
import WorkPage from "../../pages/workPage";
import { UserContext, SelectedVacanciesContext } from "../../utils/context";
import { PrivateRoute } from "../PrivateRoute";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SuccessLoginPage from "../../pages/successLogin";
import { useCookies } from "react-cookie";
import { getOwnUser } from "../../utils/api";
import AdminPage from "../../pages/adminPage";

function App() {
  const [cookies] = useCookies();
  const [userCtx, setUserCtx] = useState(null);
  const [selectedVacancies, setSelectedVacancies] = useState(null);

  useEffect(() => {
    const token = cookies.authorization;
    sessionStorage.setItem("auth_token", token);
    if (token) {
      getOwnUser(token).then((res) => {
        setUserCtx(res);
      });
    } else {
      setUserCtx({});
    }
  }, []);

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

  return (
    <Router>
      <Routes>
        <Route exact path="/start" element={<StartPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
        {/* <Route path="/" element={<WorkPage />}/>
        <Route path="/login" element={<SuccessLoginPage />}/> */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<WorkPage />} />
          <Route path="/login" element={<SuccessLoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
