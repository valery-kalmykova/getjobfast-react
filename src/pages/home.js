import React from 'react';
import styles from './home.module.css';
import HomeNumbers from '../components/HomeNumbers/HomeNumbers';
import { homeNumbers } from '../db';

const HomePage = () => {
  return (    
    <article className={styles.home}>
			<div className={styles.blockTitle}>
				<h1 className={styles.title}>GETJOBFAST - быстро найдёт работу за Вас</h1>					
        <svg width="45.5%" height="11" viewBox="0 0 569 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.10083 10.7503V0.718506L569 5.70032L0.10083 10.7503Z" fill="#3600F0"/>
        </svg>					
				<p className={styles.subtitle}>Умный сервис, знающий об эффективном поиске работы всё! От правильно оформленного резюме до лайфхаков на собеседовании.</p>
				<button className={styles.popupBtn}>ПОПРОБОВАТЬ БЕСПЛАТНО</button>
			</div>
      <div className={styles.numbers}>	
      {homeNumbers.map((el, index) => {
        return <HomeNumbers number={el.number} text1={el.text1} text2={el.text2} key={index} /> 
      })}
      </div> 
		</article>
  )
}

export default HomePage;