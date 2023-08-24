import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getOwnUser, getUserResumeById, getUserResumes, saveUser } from "../utils/api";

const SuccessLoginPage = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getResumes = async() => {
      const resumesMine = await getUserResumes(token);
      // const data = await getUserResumeById(token, "ad74569dff09dbb5490039ed1f414e6e49474a");
      // const { items } = data;
      // console.log(items)
      // const textArr = JSON.stringify(items)
      // return textArr;
    }
    const getUser = async () => {
      const data = await getOwnUser(token);
      const { first_name, email, middle_name, last_name, phone } = data;
      setUserName(first_name);
      const resumes = await getResumes();
      const formData = {
        email: email,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        phone: phone,
        resumes: resumes
      }
      // await saveUser(token, formData)
    };
    getUser();    
  }, []);

  return (
    <div className={styles.startMain}>
      <h1 className={styles.startTitle}>Get job fast!</h1>
      <p>Привет, {userName}</p>
      <Link to="/" className={styles.startBtn}>
        Перейти в рабочее пространство
      </Link>
    </div>
  );
};

export default SuccessLoginPage;
