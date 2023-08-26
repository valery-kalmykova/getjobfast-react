import React, { useContext, useEffect } from "react";
import styles from "./page.module.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  getUserResumeById,
  getUserResumes,
  saveUser,
} from "../utils/api";
import { UserContext } from "../utils/context";

const SuccessLoginPage = () => {
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userCtx] = useContext(UserContext);

  useEffect(() => {
    const getResumes = async () => {
      const resumesMine = await getUserResumes(token);
      const { id } = resumesMine.items[0];
      const data = await getUserResumeById(token, id);
      return data;
    };
    const createUser = async () => {
      const { email, first_name, middle_name, last_name, phone } = userCtx;
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
    createUser();
  }, []);

  return (
    <div className={styles.startMain}>
      {userCtx && <h1 className={styles.successLoginTitle}>Привет, {userCtx.first_name}</h1>}
      <p className={styles.successLoginMsg}>Авторизация на Get job fast прошла успешно</p>
      <Link to="/" className={styles.navigateBtn}>
        Перейти в рабочее пространство
      </Link>
    </div>
  );
};

export default SuccessLoginPage;
