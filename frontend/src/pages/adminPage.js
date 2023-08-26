import React, { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import { getUserFromDB, getUsersAll } from "../utils/api";
import { useCookies } from "react-cookie";
import { DatatableUsers } from "../components/Datatable/datatable-users";
import { UserContext } from "../utils/context";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const AdminPage = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userCtx] = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState();

  useEffect(() => {
    const getData = async () => {
      const user = await getUserFromDB(token, userCtx.email);
      if (user.role === "admin") {
        const data = await getUsersAll(token);
        setUsers(data);
      }
      setCurrentUser(user);
    };
    getData();
  }, []);

  if (currentUser && (currentUser.role === "admin")) {
    return (
      <div className={styles.startMain}>
        <h1 className={styles.title}>Пользователи</h1>
        <DatatableUsers users={users} />
      </div>
    );
  } else if (currentUser && (currentUser.role === "user")) {
    return (
      <div className={styles.startMain}>
        <h1 className={styles.title}>
          У Вас недостаточно прав для просмотра страницы
        </h1>
        <Link to={"/"} className={styles.navigateBtn}>Вернуться на главную</Link>
      </div>
    );
  } else {
    return <Layout />;
  }  
};

export default AdminPage;
