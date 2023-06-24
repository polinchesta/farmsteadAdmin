
import { Link } from "react-router-dom";
import styles from './AdminPage.module.sass';
import useTranslation from "../../hooks/useTranslation";
import React from 'react'
import { LanguageType } from "../../types/languageTypes";


export function AdminPanel() {
  const { t, setLanguage } = useTranslation();
  const handleLanguageChange = (language: LanguageType) => {
    setLanguage(language);
  };
  return (
    <div className={styles.admin}>
      <div className={styles.language}>
        <button
          className={styles.language}
          onClick={() => handleLanguageChange('ru')}>
          RU
        </button>
        <button
          className={styles.language}
          onClick={() => handleLanguageChange('en')}>
          ENG
        </button>
        <button
          className={styles.language}
          onClick={() => handleLanguageChange('pl')}>
          PL
        </button>
        <button
          className={styles.language}
          onClick={() => handleLanguageChange('by')}>
          BY
        </button>
      </div>
      <div className={styles.adminText}>
        <h1>{t.adminPanel.title}</h1>
        <p className="">{t.adminPanel.description}</p>
        <Link to="/login">
          <button className={styles.button}>
            {t.sign.input}
          </button>
        </Link>
        <div className={styles.image}>
          <img src={'/hello.svg'} alt="WebSite Logo" />
        </div>
      </div>
    </div>
  );
}