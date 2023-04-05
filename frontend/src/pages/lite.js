import React from "react";
import styles from "./page.module.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const Lite = ({ sendMessageto200Vacancies, message, setMessage }) => {
  return (
    <>
      <h3 className={styles.loginTitle}>Сопроводительное письмо:</h3>
      <InputTextarea
        className={styles.loginTextarea}
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoResize
      />
      <div className={styles.loginBtns}>
        <Button
          className="p-button p-component"
          onClick={sendMessageto200Vacancies}
        >
          <span className="p-button-icon p-c p-button-icon-left pi pi-send"></span>
          <span className="p-button-label p-c">
            Разослать отклики на 200 вакансий
          </span>
        </Button>
      </div>
    </>
  );
};

export { Lite };