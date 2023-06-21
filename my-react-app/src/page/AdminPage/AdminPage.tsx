
import { Link } from "react-router-dom";
import styles from './AdminPage.module.sass';
import useTranslation from "../../hooks/useTranslation";
import React from 'react'


export function AdminPanel() {
  const { t } = useTranslation();
  return (
    <div className={styles.admin}>
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