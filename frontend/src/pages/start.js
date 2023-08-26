import React from "react";
import styles from "./page.module.css";

const StartPage = () => {
  return (
    <div className={styles.mainV1}>
      <h1 className={styles.titleV1}>Get job fast!</h1>
      <a
        href={`http://${process.env.REACT_APP_HOST}:4000/auth`}
        className={styles.navigateBtn}
        style={{ fontSize: "36px" }}
      >
        Войти с hh.ru
      </a>
    </div>
  );
};

export default StartPage;
