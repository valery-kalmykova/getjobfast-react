import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useCookies } from "react-cookie";
import { getUserResumes, getUserVacancies, sendMessage } from "../utils/api";
import { Resumes } from "../components/Resumes/Resumes";
import { UserContext, SelectedVacanciesContext } from "../utils/context";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { defaultMessage } from "../utils/constants";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { DatatableVacancies } from "../components/Datatable/datatable";
import { ProgressBarDefault } from "../components/ProgressBar/ProgressBar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const [resumes, setResumes] = useState();
  const [vacancies, setVacancies] = useState([]);
  const [selectedVacancies, setSelectedVacancies] = useContext(
    SelectedVacanciesContext
  );
  console.log(selectedVacancies);
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [message, setMessage] = useState(defaultMessage);
  const [showDialog, setShowDialog] = useState(false);
  const [totalToSend, setTotalToSend] = useState(0);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

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

  const loadData = () => {
    getUserResumes(token).then((res) => {
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
    sessionStorage.setItem("auth_token", token);
  }, []);

  useMemo(() => {
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
    if (vacancies.length >= 200) {
      setTotalToSend(200);
      const vacancies200Array = vacancies.slice(0, 199);
      sendMessagetoVacancies(vacancies200Array);
    } else {
      setTotalToSend(vacancies.length);
      setError(true);
      setErrorText(`Было доступно ${vacancies.length} вакансий для отклика`);
      sendMessagetoVacancies(vacancies);
    }
  };

  const sendMessagetoSelectedVacancies = () => {
    console.log(selectedVacancies.length);
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
          <DatatableVacancies vacancies={vacancies} />
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

export default LoginPage;
