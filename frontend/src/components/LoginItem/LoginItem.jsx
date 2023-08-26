import { useContext } from "react";
import { UserContext } from "../../utils/context";
import styles from "./styles.module.css";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginItem = () => {
  const [userCtx] = useContext(UserContext);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["authorization"]);
  const logout = () => {
    removeCookie("authorization");
    navigate("/start");
  };
  return (
    <div className={styles.container}>
      <a
        href="https://hh.ru/"
        target="_blank"
        rel="noreferrer"
        className={styles.loginUserName}
      >
        {userCtx && userCtx.first_name + " " + userCtx.last_name}
      </a>
      <Button className="p-button-danger p-button-outlined" onClick={logout}>
        Выйти
      </Button>
    </div>
  );
}

export default LoginItem;