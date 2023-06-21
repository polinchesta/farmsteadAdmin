import styles from './cardFarmstead.module.sass';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/modal/modal';
import CardFarmsteadPopover from './cardFarmsteadPopover';
import { FarmsteadsType } from '../../../types/farmsteadsTypes';
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
    const [popoverOpen, setPopoverOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/farmstead/${id}`);
    };

    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const handleButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openModal();
    };

    const openPopover = () => {
        setPopoverOpen(true);
    };
    const closePopover = () => {
        setPopoverOpen(false);
    };
    const handleButtonClickedPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        openPopover();
    };

    console.log(dataItem.id)
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
                </div>
            </section>
        </div>
    );
};

export default CardFarmstead;
