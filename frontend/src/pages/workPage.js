import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { getUserResumes, getUserVacancies, sendMessage } from "../utils/api";
import { SelectedVacanciesContext, UserContext } from "../utils/context";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { defaultMessage } from "../utils/constants";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressBarDefault } from "../components/ProgressBar/ProgressBar";
import { MenuMain } from "../components/Menu/Menu";
import { Pro } from "../components/WorkSpaces/Pro";
import { Lite } from "../components/WorkSpaces/Lite";

const WorkPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [userCtx] = useContext(UserContext);
  const [resumes, setResumes] = useState();
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancies, setSelectedVacancies] = useContext(
    SelectedVacanciesContext
  );
  const [message, setMessage] = useState(defaultMessage);
  const [showDialog, setShowDialog] = useState(false);
  const [totalToSend, setTotalToSend] = useState(0);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [version, setVersion] = useState(0);

  const filteresList = (data) => {
    return data.filter(
      (item) =>
        item.has_test === false && !item.relations.includes("got_response")
    );
  };

  const loadVacancies = async (resumeId, page) => {
    await getUserVacancies(token, resumeId, page).then((res) => {
      setVacancies((vacancies) => [...vacancies, ...filteresList(res)]);
    });
  };

  const loadData = async () => {
    await getUserResumes(token).then((res) => {
      const items = res.items;
      items[0] = { ...items[0], checked: true };
      setResumes(items);
      let i = 0;
      while (i < 20) {
        loadVacancies(items[0].id, i);
        i++;
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const sendMessagetoVacancies = (array) => {
    setShowDialog(true);
    array.map((item) => {
      const formData = new FormData();
      formData.append("resume_id", resumes[0].id);
      formData.append("vacancy_id", item.id);
      formData.append("message", message);
      sendMessage(token, formData)
        .then(() => setCounter((counter) => counter + 1))
        .catch(() => {
          setError(true);
          setErrorText(
            "Лимит исчерпан, Вы отправили 200 откликов за день. До завтра!"
          );
        });
    });
  };

  const sendMessageto200Vacancies = () => {
    const sortArr = vacancies.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );
    if (sortArr.length >= 200) {
      setTotalToSend(200);
      const vacancies200Array = sortArr.slice(0, 199);
      sendMessagetoVacancies(vacancies200Array);
    } else {
      setTotalToSend(sortArr.length);
      setError(true);
      setErrorText(`Было доступно ${sortArr.length} вакансий для отклика`);
      sendMessagetoVacancies(sortArr);
    }
  };

  const sendMessagetoSelectedVacancies = () => {
    setTotalToSend(selectedVacancies.length);
    sendMessagetoVacancies(selectedVacancies);
    setError(true);
    setErrorText(
      `Было отмечено ${selectedVacancies.length} вакансии(-ий, -ия)`
    );
  };

  const closeDialog = () => {
    setShowDialog(false);
    setVacancies([]);
    setCounter(0);
    setTotalToSend(0);
    setError(false);
    setSelectedVacancies([]);
    loadData();
  };

  const logout = async () => {
    removeCookie("authorization");
    navigate("/start");
  };

  return (
    <div className={styles.loginMain}>
      <div className={styles.loginView}>
        <div className={styles.loginContent}>
          <div className={styles.MenuLogin}>
            <MenuMain activeIndex={version} setActiveIndex={setVersion} />
            <div className={styles.loginUser}>
              <a
                href="https://hh.ru/"
                target="_blank"
                rel="noreferrer"
                className={styles.loginUserName}
              >
                {userCtx && userCtx.first_name + " " + userCtx.last_name}
              </a>
              <Button
                className="p-button-danger p-button-outlined"
                onClick={logout}
              >
                Выйти
              </Button>
            </div>
          </div>
          {version === 0 && <Lite
            sendMessageto200Vacancies={sendMessageto200Vacancies}
            message={message}
            setMessage={setMessage}
          />}
          {version === 1 && <Pro
            vacanciesP={vacancies}
            resumesP={resumes}
            sendMessagetoSelectedVacancies={sendMessagetoSelectedVacancies}
            message={message}
            setMessage={setMessage}
          />}
        </div>
      </div>
      <Dialog
        visible={showDialog}
        onHide={() => closeDialog()}
        style={{ width: "90%" }}
      >
        <ProgressBarDefault current={counter} total={totalToSend} />
        <div className={styles.errorText}>{error && errorText}</div>
      </Dialog>
    </div>
  );
};

export default WorkPage;
