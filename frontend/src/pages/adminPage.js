import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getUsersAll } from "../utils/api";
import { useCookies } from "react-cookie";
import { DatatableUsers } from "../components/Datatable/datatable-users";

const AdminPage = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getUsersAll(token);
      setUsers(data);
    };
    getUsers();    
  }, []);

  return (
    <div className={styles.startMain}>
      <h1 className={styles.title}>Пользователи</h1>
      <DatatableUsers users={users} />
    </div>
  );
};

export default AdminPage;
