import { useEffect, useState } from 'react';
import Select from '../../../ui/select/select';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { farmsteadsActions } from '../../../store/farmsteads/farmsteadsSlice';
import TextField from '../../../ui/textField/textField';
import useDebounceValue from '../../../hooks/useDebounceValue';
import styles from './farmsteadsFilter.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import { FarmsteadsFilterType } from '../../../types/farmsteadsTypes';

const FarmsteadsFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [sortField, setSortField] = useState('id');
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    const [query, debounceQuery, setQuery] = useDebounceValue('', 500);
    const { t } = useTranslation();

    const fetchData = (filter: Partial<FarmsteadsFilterType> = {}) => {
        dispatch(
            farmsteadsActions.getFarmsteadsList({
                sortField,
                query: debounceQuery,
                limit: 4,
                page,
                ...filter,
            })
        );
    };

    const sortOptions = [
        { value: 'id', text: t.sort.popular },
        { value: 'priceAsc', text: t.sort.min },
        { value: 'priceDesc', text: t.sort.max },
    ];


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
        </form>
    );
};

export default FarmsteadsFilter;
