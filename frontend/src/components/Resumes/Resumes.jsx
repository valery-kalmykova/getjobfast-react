import React from 'react';
import styles from './styles.module.css';
import { Card } from 'primereact/card';

export const Resumes = ({ resumes, onClick }) => {
  
  if(!resumes) {
    return null;
  }
  

  return resumes.map((item, index) => {
    const { id, title, checked } = item;    

    return ( 
      <Card
        onClick={onClick}
        id={id}
        key={index}
        className={checked ? styles.cardChecked : styles.card}>
          {title}
        </Card>              
    )
  })
}