import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import WorkPage from "../../pages/workPage";
import { UserContext, SelectedVacanciesContext } from "../../utils/context";
import { PrivateRoute } from "../PrivateRoute";

import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import SuccessLoginPage from "../../pages/successLogin";

function App() {
  const [userCtx, setUserCtx] = useState(null);
  const [selectedVacancies, setSelectedVacancies] = useState(null);

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
        <Route exact path="/start" element={<HomePage />} />
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
