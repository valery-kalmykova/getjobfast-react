import React from 'react';
import styles from './styles.module.css'

export const Resumes = ({ resumes, onClick }) => {
  
  if(!resumes) {
    return null;
  }
  

  return resumes.map((item, index) => {
    const { id, title, checked } = item;    

    return (       
      <li key={index} className={styles.li}>
        <div
          onClick={onClick}
          id={id}
          className={styles.card}
          style={{ backgroundColor: checked ? '#E5D5CB' : 'transparent' }} >
            {title}
          </div>
      </li>               
    )
  })
}