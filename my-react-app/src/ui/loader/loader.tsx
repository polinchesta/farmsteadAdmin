import React from 'react';
import styles from './loader.module.sass';

const Loader: React.FC = () => (
    <>
        <div className={styles.backdrop} />
        <div className={styles.loaderContainer} role="progressbar">
            <div className={styles.loader} />
        </div>
    </>
);

export default Loader;
