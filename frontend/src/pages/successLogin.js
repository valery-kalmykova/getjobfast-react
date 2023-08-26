import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  getOwnUser,
  getUserResumeById,
  getUserResumes,
  saveUser,
} from "../utils/api";

const SuccessLoginPage = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getResumes = async () => {
      const resumesMine = await getUserResumes(token);
      const { id } = resumesMine.items[0];
      const data = await getUserResumeById(token, id);
      return data;
    };
    const getUser = async () => {
      const data = await getOwnUser(token);
      const { first_name, email, middle_name, last_name, phone } = data;
      setUserName(first_name);
      const firstResume = await getResumes();
      const { title, total_experience, experience } = firstResume;
      let experienceArr = [];
      experience.map((item) => {
        const itemOnj = {
          start: item.start,
          end: item.end,
          company: item.company,
          position: item.position,
          description: item.description,
        };
        experienceArr.push(itemOnj)
      });
      const formData = {
        email: email,
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        phone: phone,
        title: title,
        total_experience_months: total_experience.months,
        experience: experienceArr
      };
      await saveUser(token, formData)
    };
    getUser();
  }, []);

  return (
    <div className={styles.startMain}>
      <h1 className={styles.successLoginTitle}>Привет, {userName}</h1>
      <p className={styles.successLoginMsg}>Авторизация на Get job fast прошла успешно</p>
      <Link to="/" className={styles.successLoginNavigateBtn}>
        Перейти в рабочее пространство
      </Link>
    </div>
  );
};

export default SuccessLoginPage;
