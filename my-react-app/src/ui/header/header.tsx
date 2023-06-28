import React, { useState } from 'react';
import styles from './header.module.sass';
import logo from '/logo.svg';
import { Link } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { LanguageType } from '../../types/languageTypes';
import CurrencyConverter from '../currency/currency';

export function Header() {
    const { t, setLanguage } = useTranslation();
    const [showTip, setShowTip] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const handlePopoverClick = () => {
        setShowPopover(true);
    };
    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowPopover(false);
    };

    const handleLanguageChange = (language: LanguageType) => {
        setLanguage(language);
    };

    return (
        <>
            <header>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <Link className={styles.link} to="/">
                            <div
                                onMouseEnter={() => setShowTip(true)}
                                onMouseLeave={() => setShowTip(false)}>
                                <img src={logo} alt="WebSite Logo" />
                                {showTip && <div className={styles.info}>{t.header.aboutMaik}</div>}
                            </div>
                        </Link>
                    </div>
                    <div className={styles.block}>
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
                    </div>
                    <div className={styles.menu}>
                        <nav className={styles.blocks}>
                            <Link className={styles.block} to="/product">
                                {t.header.links.products}
                            </Link>
                            <Link className={styles.block} to="/farmstead">
                                {t.header.links.farmstead}
                            </Link>
                            <Link className={styles.block} to="/order">
                                {t.header.links.order}
                            </Link>
                            <Link className={styles.block} to="/booking">
                                {t.header.links.booking}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
