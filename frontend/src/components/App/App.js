import { useState, useEffect, useContext } from "react";
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router }from 'react-router-dom';
import { Routes, Route }from 'react-router-dom';
import HomePage from '../../pages/home';
import LoginPage from '../../pages/login'
import { UserContext, CheckedVacancies } from "../../utils/context";
import { getOwnUser } from '../../utils/api';
import { PrivateRoute } from '../PrivateRoute'

function App() {
  const [cookies] = useCookies();
  const [userCtx, setUserCtx] = useState(null);
  const [checkedVacancies, setCheckedVacancies] = useState(null);

  useEffect(() => {
    const token = cookies.authorization;
    sessionStorage.setItem("auth_token", token)  
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
      <CheckedVacancies.Provider value={[checkedVacancies, setCheckedVacancies]}>
        <ApplicationView /> 
      </CheckedVacancies.Provider>       
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
  )
}

export default App;
