import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ redirectPath = '/start' }) => {
  const auth = useAuth()

  return auth ? <Outlet/> : <Navigate to={redirectPath} />
};

const useAuth = () => {
  const token = sessionStorage.getItem('auth_token')
  if ( token !== 'undefined' ) {
    return true
  } else {
    return false
  }
}