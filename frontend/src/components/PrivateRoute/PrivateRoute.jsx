import { Navigate, Outlet } from "react-router-dom";
import { getOwnUser } from "../../utils/api";
import { useCookies } from "react-cookie";

export const PrivateRoute = ({ redirectPath = '/start' }) => {
  const auth = useAuth()

  return auth ? <Outlet/> : <Navigate to={redirectPath} />
};

const useAuth = async() => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const user = await getOwnUser(token);
  if ( user ) {
    return true
  } else {
    return false
  }
}