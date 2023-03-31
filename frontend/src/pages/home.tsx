import React from "react";
import styles from "./page.module.css";

const HomePage = () => {
  return (
    <div className={styles.startMain}>
      <h1 className={styles.startTitle}>Get job fast!</h1>
      <a
        href={`http://${process.env.REACT_APP_HOST}:4000/auth`}
        className={styles.startBtnLink}
      >
        <div className={styles.startBtn}>Войти с hh.ru</div>
      </a>
    </div>
  );
};

export default HomePage;
