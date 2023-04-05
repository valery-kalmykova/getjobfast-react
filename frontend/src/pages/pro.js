import React from "react";
import styles from "./page.module.css";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { DatatableVacancies } from "../components/Datatable/datatable";
import { Resumes } from "../components/Resumes/Resumes";

const Pro = ({ vacanciesP, resumesP, sendMessagetoSelectedVacancies, message, setMessage }) => {
  return (
    <>
      <h3 className={styles.loginTitle}>Мои резюме:</h3>
      <ul className={styles.loginListResumes}>
        <Resumes resumes={resumesP} />
      </ul>
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
          onClick={sendMessagetoSelectedVacancies}
        >
          <span className="p-button-icon p-c p-button-icon-left pi pi-send"></span>
          <span className="p-button-label p-c">
            Разослать отклики отмеченные вакансии
          </span>
        </Button>
      </div>
      <h3 className={styles.loginTitle}>
        Подходящие вакансии к выбранному резюме:
      </h3>
      <DatatableVacancies vacancies={vacanciesP} />
    </>
  );
};

export { Pro };