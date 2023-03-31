import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { sendMessage } from "../utils/api";
import { Resumes } from "../components/Resumes/Resumes";
import styles from "./page.module.css";
import { useNavigate } from "react-router-dom";
import { defaultMessage } from "../utils/constants";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
// import { DatatableVacancies } from "../components/Datatable/datatable";
import { ProgressBarDefault } from "../components/ProgressBar/ProgressBar";
import { useDispatch, useSelector } from "../services/hooks";
import {
  // getUserResumes,
  // getUserVacancies,
  setNoUser,
} from "../services/actions/commonActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies(["authorization"]);
  const token = cookies.authorization;
  const user = useSelector((state) => state.common.user);
  console.log(user);
  const resumes = useSelector((state) => state.common.resumes);
  const vacancies = useSelector((state) => state.common.similarVacancies);
  const [message, setMessage] = useState(defaultMessage);
  const [showDialog, setShowDialog] = useState(false);
  const [totalToSend, setTotalToSend] = useState(0);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  // const filteresList = (data: any) => {
  //   return data.filter(
  //     (item: any) =>
  //       item.has_test === false && !item.relations.includes("got_response"),
  //   );
  // };

  // const loadVacancies = (resumeId: any, page: any) => {
  //   getUserVacancies(token, resumeId, page).then((res) => {
  //     setVacancies((vacancies) => [...vacancies, ...filteresList(res)]);
  //   });
  // };

  // const loadData = () => {
  //   dispatch(getUserResumes(token));
  //   // dispatch(getUserVacancies(token, resumes[0].id, 0));
  //   // dispatch(getUserResumes()).then((res) => {
  //   //   const items = res.items;
  //   //   items[0] = { ...items[0], checked: true };
  //   //   setResumes(items);
  //   //   let i = 0;
  //   //   while (i < 20) {
  //   //     loadVacancies(items[0].id, i);
  //   //     i++;
  //   //   }
  //   // });
  // };

  useEffect(() => {
    // dispatch(getUserResumes(token));
  }, []);

  // useMemo(() => {
  //   loadData();
  // }, []);

  const sendMessagetoVacancies = (array: any) => {
    setShowDialog(true);
    array.map((item: any) => {
      const formData = new FormData();
      formData.append("resume_id", resumes![0].id);
      formData.append("vacancy_id", item.id);
      formData.append("message", message);
      sendMessage(token, formData)
        .then(() => setCounter(counter + 1))
        .catch(() => {
          setError(true);
          setErrorText(
            "Лимит исчерпан, Вы отправили 200 откликов за день. До завтра!",
          );
        });
    });
  };

  const sendMessageto200Vacancies = () => {
    // const sortArr =  vacancies.sort(
    //   (a: any, b: any) => new Date(b.published_at) - new Date(a.published_at),
    // );
    const sortArr = vacancies;
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

  // const sendMessagetoSelectedVacancies = () => {
  //   setTotalToSend(selectedVacancies.length);
  //   sendMessagetoVacancies(selectedVacancies);
  //   setError(true);
  //   setErrorText(
  //     `Было отмечено ${selectedVacancies.length} вакансии(-ий, -ия)`,
  //   );
  // };

  const closeDialog = () => {
    setShowDialog(false);
    // setVacancies([]);
    setCounter(0);
    setTotalToSend(0);
    setError(false);
    // setSelectedVacancies([]);
    // loadData();
  };

  const logout = async () => {
    // removeCookie("authorization");
    // sessionStorage.removeItem("auth_token");
    // setUserCtx({});
    dispatch(setNoUser());
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
              {user.first_name + " " + user.last_name}
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
            <Resumes />
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
              // onClick={sendMessagetoSelectedVacancies}
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
          {/* <DatatableVacancies vacancies={vacancies} /> */}
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
