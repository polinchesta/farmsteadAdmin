import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { farmsteadsActions } from '../../../store/farmsteads/farmsteadsSlice';
import TextField from '../../../ui/textField/textField';
import useDebounceValue from '../../../hooks/useDebounceValue';
import styles from './farmsteadsFilter.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import { FarmsteadsFilterType, FarmsteadsType } from '../../../types/farmsteadsTypes';
import axios from 'axios';

const FarmsteadsFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [farmsteads, setFarmsteads] = useState<FarmsteadsType[]>([]);
    const [sortField, setSortField] = useState('id');
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [query, debounceQuery, setQuery] = useDebounceValue('', 500);
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const newFarmsteadId = generateUUID();
    const [newFarmstead, setNewFarmstead] = useState<FarmsteadsType>({
        id: generateUUID(),
        img: '',
        text: '',
        textAll: '',
        url: '',
        titleVideo: '',
        title: '',
        adres: '',
        longitude: 0,
        latitude: 0,
        house: '',
        place: '',
        price: 0,
        contact: '',
        email: '',
        top: 0,
        image: [],
        comments: []
    });

    const fetchData = (filter: Partial<FarmsteadsFilterType> = {}) => {
        dispatch(
            farmsteadsActions.getFarmsteadsList({
                sortField,
                query: debounceQuery,
                limit: 5,
                page,
                ...filter,
            })
        );
    };

    function generateUUID(): number {
        return Date.now();
    }
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

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
        if (page === 4) {
            setIsLastPage(true);
        } else {
            setIsLastPage(false);
        }
    }, [page]);

    const handleAddFarmstead = async (newFarmstead: FarmsteadsType) => {
        try {
            const response = await axios.post<FarmsteadsType>('http://localhost:3002/farmsteads', {
                ...newFarmstead,
                id: newFarmsteadId,
                image: newFarmstead.image.map((image) => ({ ...image })),
            });

            const addedFarmstead = response.data;

            setFarmsteads((prevFarmstead) => [...prevFarmstead, addedFarmstead]);

            setNewFarmstead({
                id: generateUUID(),
                img: '',
                text: '',
                textAll: '',
                url: '',
                titleVideo: '',
                title: '',
                adres: '',
                longitude: 0,
                latitude: 0,
                house: '',
                place: '',
                price: 0,
                contact: '',
                email: '',
                top: 0,
                image: [],
                comments: [],
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding farmstead:', error);
        }
    };

    return (
        <form className={styles.container} onSubmit={onSortSubmit}>
            <div className="field">
                <TextField
                    className={styles.field}
                    label={t.field.search}
                    value={query}
                    setValue={setQuery}
                />
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
                    disabled={isLastPage}>
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
                            value={newFarmstead.img}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, img: e.target.value })}
                            placeholder={t.orderModal.img}
                        />
                        <input
                            type="text"
                            value={newFarmstead.title}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, title: e.target.value })}
                            placeholder={t.orderModal.title}
                        />
                        <input
                            type="text"
                            value={newFarmstead.text}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, text: e.target.value })}
                            placeholder={t.orderModal.text}
                        />
                        <input
                            type="text"
                            value={newFarmstead.textAll}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, textAll: e.target.value })}
                            placeholder={t.orderModal.textAll}
                        />
                        <input
                            type="text"
                            value={newFarmstead.url}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, url: e.target.value })}
                            placeholder={t.orderModal.url}
                        />
                        <input
                            type="text"
                            value={newFarmstead.titleVideo}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, titleVideo: e.target.value })}
                            placeholder={t.orderModal.titleVideo}
                        />

                        <input
                            type="text"
                            value={newFarmstead.adres}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, adres: e.target.value })}
                            placeholder={t.orderModal.adres}
                        />
                        <p>{t.orderModal.latitude}:</p>
                        <input
                            type="number"
                            value={newFarmstead.latitude}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, latitude: Number(e.target.value) })}
                            placeholder={t.orderModal.latitude}
                        />
                        <p>{t.orderModal.longitude}:</p>
                        <input
                            type="number"
                            value={newFarmstead.longitude}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, longitude: Number(e.target.value) })}
                            placeholder={t.orderModal.longitude}
                        />
                        <input
                            type="text"
                            value={newFarmstead.house}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, house: e.target.value })}
                            placeholder={t.orderModal.house}
                        />
                        <input
                            type="text"
                            value={newFarmstead.place}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, place: e.target.value })}
                            placeholder={t.orderModal.place}
                        />
                        <p>{t.orderModal.price}:</p>
                        <input
                            type="number"
                            value={newFarmstead.price}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, price: Number(e.target.value) })}
                            placeholder={t.orderModal.price}
                        />
                        <input
                            type="text"
                            value={newFarmstead.contact}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, contact: e.target.value })}
                            placeholder={t.orderModal.contact}
                        />
                        <input
                            type="text"
                            value={newFarmstead.email}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, email: e.target.value })}
                            placeholder={t.orderModal.email}
                        />
                        <p>{t.orderModal.top}:</p>
                        <input
                            type="number"
                            value={newFarmstead.top}
                            onChange={(e) => setNewFarmstead({ ...newFarmstead, top: Number(e.target.value) })}
                            placeholder={t.orderModal.top}
                        />
                        <input
                            type="text"
                            value={newFarmstead.image[0]?.img || ''}
                            onChange={(e) => {
                                const updatedImage = [...newFarmstead.image];
                                updatedImage[0] = { img: e.target.value };
                                setNewFarmstead({ ...newFarmstead, image: updatedImage });
                            }}
                            placeholder={t.orderModal.image1}
                        />
                        <input
                            type="text"
                            value={newFarmstead.image[1]?.img || ''}
                            onChange={(e) => {
                                const updatedImage = [...newFarmstead.image];
                                updatedImage[1] = { img: e.target.value };
                                setNewFarmstead({ ...newFarmstead, image: updatedImage });
                            }}
                            placeholder={t.orderModal.image2}
                        />
                        <input
                            type="text"
                            value={newFarmstead.image[2]?.img || ''}
                            onChange={(e) => {
                                const updatedImage = [...newFarmstead.image];
                                updatedImage[1] = { img: e.target.value };
                                setNewFarmstead({ ...newFarmstead, image: updatedImage });
                            }}
                            placeholder={t.orderModal.image3}
                        />
                        <button className={styles.button} onClick={() => handleAddFarmstead(newFarmstead)}>{t.add.add}</button>
                    </div>
                </>
            )}
        </form>
    );
};

export default FarmsteadsFilter;
