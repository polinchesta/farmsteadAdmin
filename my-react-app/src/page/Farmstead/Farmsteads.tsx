import React, { useEffect, useState } from 'react';
import styles from './Farmsteads.module.sass';
import useTranslation from '../../hooks/useTranslation';
import Loader from '../../ui/loader/loader';
import { useAppSelector } from '../../hooks/redux-hooks';
import CardFarmstead from './cardFarmstead/cardFarmstead';
import FarmsteadsFilter from './filter/farmsteadsFilter';

export function Farmsteads() {
    const farmsteads = useAppSelector((state) => state.farmsteads.farmsteads);
    const loading = useAppSelector((state) => state.farmsteads.loading);
    const { t } = useTranslation();
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setShowScrollToTop(true);
        } else {
            setShowScrollToTop(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {loading && <Loader />}
            <FarmsteadsFilter />
            <div className={styles.gridContainer}>
                {farmsteads.map((farmstead) => (
                    <CardFarmstead
                        key={farmstead.id}
                        img={farmstead.img}
                        dataItem={farmstead}
                        id={farmstead.id}
                        t={t}
                    />
                ))}
            </div>
            {showScrollToTop && (
                <div className={styles.scrollToTop} onClick={scrollToTop}>
                    &uarr;
                </div>
            )}
        </>
    );
}
