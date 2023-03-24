import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { getUserResumes, getUserVacancies, sendMessage } from "../utils/api";
import { Resumes } from "../components/Resumes/Resumes";
import {
  UserContext,
  VacanciesContext,
  SelectedVacanciesContext,
} from "../utils/context";
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
  const [selectedVacancies, setSelectedVacancies] = useContext(
    SelectedVacanciesContext
  );
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [message, setMessage] = useState(defaultMessage);

  const loadVacancies = (resumeId) => {
    let i = 0;
    while (i < 20) {
      if (i === 0) {
        getUserVacancies(token, resumeId, i).then((res) => {
          const filteredList = res.filter(
            (item) =>
              item.has_test === false &&
              !item.relations.includes("got_response")
          );
          setVacancies(filteredList);
        });
      }
      getUserVacancies(token, resumeId, i).then((res) => {
        const filteredList = res.filter(
          (item) =>
            item.has_test === false && !item.relations.includes("got_response")
        );
        setVacancies([...vacancies, ...res]);
      });
      i++;
    }
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

  const sendMessagetoAllVacancies = () => {
    selectedVacancies.map((item) => {
      const formData = new FormData();
      formData.append("resume_id", resumes[0].id);
      formData.append("vacancy_id", item.id);
      formData.append("message", message);
      console.log(message);
      try {
        sendMessage(token, formData);
      } catch (err) {
        console.log(err);
        return;
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
            <Resumes resumes={resumes} />
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
