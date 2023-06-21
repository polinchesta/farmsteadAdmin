import React from 'react';
import useTranslation from '../../hooks/useTranslation';
import styles from './Page404.module.sass';

export function Page404() {
    const {t} = useTranslation()
    return (
        <div className={styles.error}>
            <h2>{t.page404.error}</h2>
            <img src={'/monster.svg'} alt="WebSite Logo" />
        </div>
    );
}
