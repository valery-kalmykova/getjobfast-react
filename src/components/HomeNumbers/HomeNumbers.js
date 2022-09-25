import React from 'react';
import styles from './HomeNumbers.module.css';

const HomeNumbers = ({number, text1, text2}) => {
  return(
    <div className={styles.numbersBlock}>
      <div className={styles.numder}>{number}</div>
      <div className={styles.numdersText1}>{text1}</div>
      <div className={styles.numdersText2}>{text2}</div>
    </div>
  )  
}

export default HomeNumbers;