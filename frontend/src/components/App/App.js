import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import { UserContext, VacanciesContext, SelectedVacanciesContext } from "../../utils/context";
import { getOwnUser } from "../../utils/api";
import { PrivateRoute } from "../PrivateRoute";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [cookies] = useCookies();
  const [userCtx, setUserCtx] = useState(null);
  const [vacancies, setVacancies] = useState(null);
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
      <VacanciesContext.Provider value={[vacancies, setVacancies]}>
        <SelectedVacanciesContext.Provider value={[selectedVacancies, setSelectedVacancies]}>
          <ApplicationView />
        </SelectedVacanciesContext.Provider>
      </VacanciesContext.Provider>
    </UserContext.Provider>
  );
}

const ApplicationView = () => {
  const [userCtx] = useContext(UserContext);

  if (!userCtx) {
    return <></>;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/start" element={<HomePage />} />
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<LoginPage />}/>
          <Route path="/login" element={<LoginPage />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
