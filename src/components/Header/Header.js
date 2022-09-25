import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import logo from '../../images/logo.svg';
import whatsappLogoBlack from '../../images/whatsapp-icon-black.svg';
import telegramLogoBlack from '../../images/telegram-icon-black.svg';
import whatsappLogoWhite from '../../images/whatsapp-icon-white.svg';
import telegramLogoWhite from '../../images/telegram-icon-white.svg';

const Header = () => {

  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");
    setMobileView(mediaQuery.matches);
    
    function updateIsNarrowScreen(e) {
      setMobileView(e.matches);
    }
    mediaQuery.addEventListener('change', updateIsNarrowScreen)

    return function cleanup() {
      mediaQuery.removeEventListener('change', updateIsNarrowScreen)
    }
  }, []);
    
  return (
    <header className={styles.header}>
		<div className={styles.headerMob}>
			<img src={logo} alt="Логотип" className={styles.headerLogo}></img>
			<div className={styles.headerMobMenu}>
				<div className={styles.headerMenu}>		
					<a href="/" className={styles.menuItem}><div>ГЛАВНАЯ</div></a>
					<a href="#services" className={styles.menuItem}><div>УСЛУГИ</div></a>
					<a href="#about" className={styles.menuItem}><div>О СЕРВИСЕ</div></a>
					<a href="#prices" className={styles.menuItem}><div>ТАРИФЫ</div></a>
				</div>
			</div>			
			<div className={styles.headerContacts}>
				<div className={styles.menuWhatsapp}>
          <a href="https://api.whatsapp.com/send?phone=79999996244">
            <img src={mobileView ? whatsappLogoWhite : whatsappLogoBlack} alt='Whatsapp логотип'></img>            
					</a>
				</div>				
				<div className={styles.menuTelephone}>
					<a href="tel:+79999996244">+7-999999-6-244</a>
					<a href="mailto:info@getjobfast.ru">info@getjobfast.ru</a>
				</div>
				<div className={styles.menuTelegram}>
          <a href="https://t.me/get_job_fast">
            <img src={mobileView ? telegramLogoWhite : telegramLogoBlack} alt='Telegram логотип'></img>
					</a>
				</div>
        { mobileView ? (
          <button className={styles.menuMobIcon}></button>
        ) : null }				
			</div>
			<button className={styles.headerBtn}>ПОЛУЧИТЬ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ</button>		
		</div>
	</header>
  )
}

export default Header;