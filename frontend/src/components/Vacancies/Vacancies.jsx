import React, { useContext } from 'react';
import styles from './styles.module.css'
import { VacanciesContext } from '../../utils/context'

export const Vacancies = () => {
const [vacancies, setVacancies] = useContext(VacanciesContext);

const toggleCheck = (id, has_test) => {
  if (has_test) return;
  const newList = vacancies.map((item) => {    
    if(item.id === id) {
      if (!item.checked) {
        return { ...item, checked: true }
      } else {
        return { ...item, checked: false }
      }      
    } return item;
  })
  setVacancies(newList);
};

  if(!vacancies) {
    return null
  }
  
  return vacancies.map((item, index) => {
    const { name, employer, id, has_test, apply_alternate_url, checked } = item;

    return (             
      <li id={id} key={index} className={styles.li} onClick={()=>toggleCheck(id, has_test)}
      style={{ backgroundColor: checked ? '#E5D5CB' : 'transparent' }}
      >
        <div className={styles.card}>
          <p>{employer.name} / {name}</p>
          { has_test && 
          <a 
            href={apply_alternate_url} target='_blank' rel="noreferrer"
            className={styles.link} >Пройти тест на hh.ru
          </a>
          }            
        </div>
      </li>           
    )
  })
}