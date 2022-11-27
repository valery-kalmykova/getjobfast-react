import React, { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { getUserResumes, getUserVacancies, sendMessage } from '../utils/api';
import { Resumes } from '../components/Resumes/Resumes';
import { Vacancies } from '../components/Vacancies/Vacancies';
import { UserContext, CheckedVacancies } from '../utils/context';
import styles from './page.module.css';
import { useNavigate } from 'react-router-dom';
import { defaultMessage } from '../utils/constants'

const LoginPage = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['authorization']);
  const token = cookies.authorization;
  const [resumes, setResumes] = useState();
  const [checkedVacancies, setCheckedVacancies] = useContext(CheckedVacancies);
  const [userCtx, setUserCtx] = useContext(UserContext);
  const [message, setMessage] = useState(defaultMessage);

  const loadVacancies = (resumeId) => {
    getUserVacancies(token, resumeId).then((res) => {
      setCheckedVacancies(res);
      console.log(res)
    });
    
  }
  
  useEffect(() => {
    sessionStorage.setItem("auth_token", token)
    getUserResumes(token).then((res) => {
      const items = res.items;
      items[0] = {...items[0], checked: true}
      setResumes(items);
      loadVacancies(items[0].id)
    });
    
  },[])

  const checkResume = (e) => {
    const newItems = resumes.map((item) => {
      if (item.checked && item.id === e.target.id) {
        return item;
      }
      if (item.checked && item.id !== e.target.id) {
        return {...item, checked: false}
      }
      if (!item.checked &&item.id === e.target.id) {
        loadVacancies(item.id)
        return {...item, checked: true}
      }
    })
    setResumes(newItems);
  }

  const checkAllVacancies = () => {
    const newList = checkedVacancies.map((item) => {
      if(!item.has_test) {
        return {...item, checked: true }
      } return item;
    })
    setCheckedVacancies(newList);
  }

  const unCheckAllVacancies = () => {
    const newList = checkedVacancies.map((item) => {
      return {...item, checked: false }
    })
    setCheckedVacancies(newList);
  }

  const sendMessagetoAllVacancies = () => {
    checkedVacancies.map((item) => {
      if(item.checked) {
        const formData  = new FormData();
        formData.append('resume_id', resumes[0].id);
        formData.append('vacancy_id', item.id);
        formData.append('message', message);
        console.log(message)  
        try {
          sendMessage(token, formData)
        } catch(err) {
          console.log(err)
        }  
      }
    })
    loadVacancies(resumes[0].id)
  }

  const logout = async () => {
    removeCookie('authorization');    
    sessionStorage.removeItem('auth_token');
    setUserCtx({});
    navigate('/start');
  };

  return (
    <div className={styles.loginMain}>
      <div className={styles.loginView}>
        <div className={styles.loginContent}>  
          <div className={styles.loginUser}>
            <a href='https://hh.ru/' target='_blank' rel="noreferrer" className={styles.loginUserName}>{userCtx.first_name + ' ' + userCtx.last_name}</a>
            <button className={styles.loginUserLogout} onClick={logout}>Выйти</button>
          </div>        
          <h3 className={styles.loginTitle}>Мои резюме:</h3>
          <ul className={styles.loginListResumes}>
            <Resumes resumes={resumes} onClick={(e)=>checkResume(e)}/>
          </ul>          
          <h3 className={styles.loginTitle}>Подходящие вакансии к выбранному резюме:</h3>
          <div className={styles.loginVacanciesBtns}>
            <button className={styles.loginVacanciesBtn + ' ' + styles.BtnCheck} onClick={checkAllVacancies}>Выбрать все</button>
            <button className={styles.loginVacanciesBtn + ' ' + styles.BtnUnCheck} onClick={unCheckAllVacancies}>Снять выделение</button>
          </div>          
          <ul className={styles.loginListVacancies}>
            <Vacancies />
          </ul>
          <h3 className={styles.loginTitle}>Сопроводительное письмо:</h3>
          <textarea 
            className={styles.loginTextarea} 
            rows="5" 
            onChange={(e)=>setMessage(e.target.value)}
            value={message} />
          <div className={styles.loginBtns}>
            <button 
              onClick={sendMessagetoAllVacancies}
              className={styles.loginBtn}>Разослать отклики
            </button>
            <button 
              onClick={()=>loadVacancies(resumes[0].id)}
              className={styles.loginBtn}>Обновить список вакансий
            </button>
          </div>          
        </div>
      </div>
    </div>    
  )

}

export default LoginPage;

