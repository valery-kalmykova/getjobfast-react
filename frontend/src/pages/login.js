import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import { getUserResumes, getUserVacancies, sendMessage } from "../utils/api";
import { Resumes } from "../components/Resumes/Resumes";
import {
  UserContext,
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
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancies, setSelectedVacancies] = useContext(
    SelectedVacanciesContext
  );
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [message, setMessage] = useState(defaultMessage);

  const filteresList = (data) => {
    return data.filter(
      (item) =>
        item.has_test === false && !item.relations.includes("got_response")
    );
  };

  const loadVacancies = (resumeId, page) => {
    getUserVacancies(token, resumeId, page).then((res) => {
      setVacancies((vacancies) => [...vacancies, ...filteresList(res)]);
    });
  };
  
 useMemo(() => {
    getUserResumes(token).then((res) => {
      const items = res.items;
      items[0] = { ...items[0], checked: true };
      setResumes(items);
      loadVacancies(items[0].id, 0);
      loadVacancies(items[0].id, 1);
      loadVacancies(items[0].id, 2);
      loadVacancies(items[0].id, 3);
      loadVacancies(items[0].id, 4);
      loadVacancies(items[0].id, 5);
      loadVacancies(items[0].id, 6);
      loadVacancies(items[0].id, 7);
      loadVacancies(items[0].id, 8);
      loadVacancies(items[0].id, 9);
      loadVacancies(items[0].id, 10);
      loadVacancies(items[0].id, 11);
      loadVacancies(items[0].id, 12);
      loadVacancies(items[0].id, 13);
      loadVacancies(items[0].id, 14);
      loadVacancies(items[0].id, 15);
      loadVacancies(items[0].id, 16);
      loadVacancies(items[0].id, 17);
      loadVacancies(items[0].id, 18);
      loadVacancies(items[0].id, 19);
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("auth_token", token);
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
          <DatatableVacancies vacancies={vacancies} />      
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
