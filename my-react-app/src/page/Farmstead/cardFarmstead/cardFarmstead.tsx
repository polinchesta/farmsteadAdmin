import styles from './cardFarmstead.module.sass';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FarmsteadsType } from '../../../types/farmsteadsTypes';
import { farmsteadsActions } from '../../../store/farmsteads/farmsteadsSlice';
import { useAppDispatch } from '../../../hooks/redux-hooks';
interface CardProps {
    id: number;
    img: string;
    t: any;
    dataItem: FarmsteadsType
}

const CardFarmstead: React.FC<CardProps> = ({
    id,
    img,
    dataItem,
    t,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/farmstead/${id}`);
    };


    const handleEdit = () => {
        navigate(`/farmatead/edit/${dataItem.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(farmsteadsActions.deleteFarmstead(dataItem.id));
            navigate(`/farmatead`);
        }
    };
    return (
        <div className={styles.container}>
            <section className={styles.farmstead} onClick={handleClick}>
                <div className={styles.farmsteadImg}>
                    <img className={styles.falvarek} src={img} alt="farmstead title" />
                </div>
                <div className={styles.text}>
                    <h2 className={styles.title}>{dataItem.title}</h2>
                    <p className={styles.information}>{dataItem.text}</p>
                    <p className={styles.information}>
                        {dataItem.price} BYN/ночь/с человека, {dataItem.house}, {dataItem.place}
                    </p>
                    <p className={styles.information}>
                        {dataItem.contact}, {dataItem.email}
                    </p>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={handleEdit}>
                            {t.add.edit}
                        </button>
                        <button className={styles.button} onClick={handleDelete}>
                            {t.add.delete}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CardFarmstead;
