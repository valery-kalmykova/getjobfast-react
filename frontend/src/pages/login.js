import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { getUserResumes, getUserVacancies, sendMessage } from "../utils/api";
import { Resumes } from "../components/Resumes/Resumes";
import { UserContext, VacanciesContext } from "../utils/context";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { defaultMessage } from "../utils/constants";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { DatatableVacancies } from "../components/Datatable/datatable";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [resumes, setResumes] = useState();
  const [vacancies, setVacancies] = useContext(VacanciesContext);
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [message, setMessage] = useState(defaultMessage);

  const loadVacancies = (resumeId) => {
    getUserVacancies(token, resumeId).then((res) => {
      setVacancies(res);
    });
  };

  useEffect(() => {
    sessionStorage.setItem("auth_token", token);
    getUserResumes(token).then((res) => {
      const items = res.items;
      items[0] = { ...items[0], checked: true };
      setResumes(items);
      loadVacancies(items[0].id);
    });
  }, []);

  const checkResume = (e) => {
    const newItems = resumes.map((item) => {
      if (item.checked && item.id === e.target.id) {
        return item;
      }
      if (item.checked && item.id !== e.target.id) {
        return { ...item, checked: false };
      }
      if (!item.checked && item.id === e.target.id) {
        loadVacancies(item.id);
        return { ...item, checked: true };
      }
    });
    setResumes(newItems);
  };

  const sendMessagetoAllVacancies = () => {
    vacancies.map((item) => {
      if (item.checked) {
        const formData = new FormData();
        formData.append("resume_id", resumes[0].id);
        formData.append("vacancy_id", item.id);
        formData.append("message", message);
        console.log(message);
        try {
          sendMessage(token, formData);
        } catch (err) {
          console.log(err);
        }
      }
    });
    loadVacancies(resumes[0].id);
  };

  const logout = async () => {
    removeCookie("authorization");
    sessionStorage.removeItem("auth_token");
    setUserCtx({});
    navigate("/start");
  };

  return (
    <div className={styles.loginMain}>
      <div className={styles.loginView}>
        <div className={styles.loginContent}>
          <div className={styles.loginUser}>
            <a
              href="https://hh.ru/"
              target="_blank"
              rel="noreferrer"
              className={styles.loginUserName}
            >
              {userCtx.first_name + " " + userCtx.last_name}
            </a>
            <Button
              className="p-button-danger p-button-outlined"
              onClick={logout}
            >
              Выйти
            </Button>
          </div>
          <h3 className={styles.loginTitle}>Мои резюме:</h3>
          <ul className={styles.loginListResumes}>
            <Resumes resumes={resumes} onClick={(e) => checkResume(e)} />
          </ul>
          <h3 className={styles.loginTitle}>
            Подходящие вакансии к выбранному резюме:
          </h3>
          <DatatableVacancies />         
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
              onClick={sendMessagetoAllVacancies}
            >
              <span className="p-button-icon p-c p-button-icon-left pi pi-send"></span>
              <span className="p-button-label p-c">Разослать отклики</span>
            </Button>
            <Button
              className="p-button-secondary p-component"
              onClick={() => loadVacancies(resumes[0].id)}
            >
              <span className="p-button-icon p-c p-button-icon-left pi pi-refresh"></span>
              <span className="p-button-label p-c">
                Обновить список вакансий
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
