import React, { useEffect, useState } from 'react';
import ProductsCard from './cardProducts/cardProduct';
import styles from './Products.module.sass';
import { useAppSelector } from '../../hooks/redux-hooks';
import ProductsFilter from './filter/productsFilter';
import Loader from '../../ui/loader/loader';
import useTranslation from '../../hooks/useTranslation';
import { Header } from '../../ui/header/header';

export function Products() {
    const products = useAppSelector((state) => state.products.products);
    const loading = useAppSelector((state) => state.products.loading);
    const { t } = useTranslation();
    return (
        <>
            <Header />
            {loading && <Loader />}
            <ProductsFilter />
            <div className={styles.gridContainer}>
                {products.map((product) => (
                    <ProductsCard
                        id={product.id}
                        key={product.id}
                        img={product.img}
                        dataItem={product}
                        t={t}
                    />
                ))}
            </div>
        </>
    );
}
