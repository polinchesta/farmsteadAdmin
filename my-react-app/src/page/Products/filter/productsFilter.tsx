import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { productsActions } from '../../../store/products/productsSlice';
import TextField from '../../../ui/textField/textField';
import useDebounceValue from '../../../hooks/useDebounceValue';
import { ProductType, ProductsFilterType } from '../../../types/productsTypes';
import styles from './productsFilter.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import axios from 'axios';

const ProductsFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [sortField, setSortField] = useState('id');
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [query, debounceQuery, setQuery] = useDebounceValue('', 500);
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newProductId = generateUUID();
    const [newProduct, setNewProduct] = useState<ProductType>({
        id: generateUUID(),
        img: '',
        title: '',
        price: 0,
        count: '',
        rajon: '',
        adress: '',
        number: '',
        related: [],
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const fetchData = (filter: Partial<ProductsFilterType> = {}) => {
        dispatch(
            productsActions.getProductsList({
                sortField,
                relatedIds: undefined,
                query: debounceQuery,
                limit: 6,
                page,
                ...filter,
            })
        );
    };

    function generateUUID(): number {
        return Date.now();
    }

    const updatePageAndFetchData = (newPage: number) => {
        setPage(newPage);
        fetchData({ page: newPage });
    };

    const resetPageAndFetchData = () => {
        updatePageAndFetchData(1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            updatePageAndFetchData(page - 1);
        }
    };

    const handleNextPage = () => {
        updatePageAndFetchData(page + 1);
    };

    const onSortSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        resetPageAndFetchData();
    };

    useEffect(() => {
        resetPageAndFetchData();
    }, [debounceQuery]);

    useEffect(() => {
        setIsLastPage(false);
    }, [query, sortField]);

    useEffect(() => {
        if (page === 3) {
            setIsLastPage(true);
        } else {
            setIsLastPage(false);
        }
    }, [page]);

    const handleAddProduct = async (newProduct: ProductType) => {
        try {
            const response = await axios.post<ProductType>('http://localhost:3003/products', {
                ...newProduct,
                id: newProductId,
                related: newProduct.related ? [...newProduct.related] : [],
            });

            const addedProduct = response.data;

            setProducts((prevProducts) => [...prevProducts, addedProduct]);

            setNewProduct({
                id: generateUUID(),
                img: '',
                title: '',
                price: 0,
                count: '',
                rajon: '',
                adress: '',
                number: '',
                related: [],
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form className={styles.container} onSubmit={onSortSubmit}>
            <div className="field">
                <TextField className={styles.field} label={t.field.search} value={query} setValue={setQuery} />
            </div>
            <div className={styles.pagination}>
                <button className={styles.buttonPagination} type="button" onClick={handlePrevPage}>
                    ❮
                </button>
                <div className={styles.pageText}>
                    <p className="page">{page}</p>
                </div>
                <button
                    className={`${styles.buttonPagination} ${isLastPage ? styles.disabled : ''}`}
                    type="button"
                    onClick={handleNextPage}
                    disabled={isLastPage}
                >
                    ❯
                </button>
            </div>
            <button className={styles.button} onClick={handleOpenModal}>
                {t.add.add}
            </button>
            {isModalOpen && (
                <>
                    <div className={styles.modalBackdrop}></div>
                    <div className={styles.modal}>
                        <h2>{t.add.add}</h2>
                        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>&times;</button>
                        <input
                            type="text"
                            value={newProduct.img}
                            onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
                            placeholder={t.orderModal.img}
                        />
                        <input
                            type="text"
                            value={newProduct.title}
                            onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                            placeholder={t.orderModal.title}
                        />
                        <p>{t.orderModal.price}:</p>
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                            placeholder={t.orderModal.price}
                        />
                        <input
                            type="text"
                            value={newProduct.count}
                            onChange={(e) => setNewProduct({ ...newProduct, count: e.target.value })}
                            placeholder={t.orderModal.kol}
                        />
                        <input
                            type="text"
                            value={newProduct.rajon}
                            onChange={(e) => setNewProduct({ ...newProduct, rajon: e.target.value })}
                            placeholder={t.orderModal.rajon}
                        />
                        <input
                            type="text"
                            value={newProduct.adress}
                            onChange={(e) => setNewProduct({ ...newProduct, adress: e.target.value })}
                            placeholder={t.orderModal.adres}
                        />
                        <input
                            type="text"
                            value={newProduct.number}
                            onChange={(e) => setNewProduct({ ...newProduct, number: e.target.value })}
                            placeholder={t.orderModal.contact}
                        />
                        <input
                            type="text"
                            value={newProduct.related ? newProduct.related.join(', ') : ''}
                            onChange={(e) => {
                                const relatedValues = e.target.value.split(', ').map((value) => parseInt(value.trim(), 10));
                                setNewProduct((prevProduct) => ({
                                    ...prevProduct,
                                    related: relatedValues,
                                }));
                            }}
                            placeholder={t.orderModal.pohoz}
                        />
                        <button className={styles.button} onClick={() => handleAddProduct(newProduct)}>{t.add.add}</button>
                    </div>
                </>
            )}
        </form>
    );
};

export default ProductsFilter;
