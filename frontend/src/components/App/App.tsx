import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
// import { PrivateRoute } from "../PrivateRoute";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useDispatch } from "../../services/hooks";
import { getOwnUser } from "../../services/actions";

function App() {
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  useEffect(() => {
    const token = cookies.authorization;
    if (token) {
      dispatch(getOwnUser(token));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/start" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
