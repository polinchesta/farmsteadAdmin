import { ProductType } from '../../../types/productsTypes';
import styles from './cardProduct.module.sass';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { productsActions } from '../../../store/products/productsSlice';
import { useState } from 'react';

interface CardProps {
    dataItem: ProductType;
    id: number;
    img: string;
    t: any;
}

const ProductsCard: React.FC<CardProps> = ({ id, dataItem, img, t }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const handleClick = () => {
        navigate(`/product/${dataItem.id}`);
    };

    const handleEdit = () => {
        navigate(`/product/edit/${dataItem.id}`);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setIsDeleting(true); 
            dispatch(productsActions.deleteProduct(dataItem.id))
                .then(() => {
                    setIsDeleting(false);
                });
        }
    };

    return (
        <div className={styles.container}>
            <section className={styles.product} onClick={handleClick}>
                <div>
                    <img src={img} alt="product title" />
                </div>
                <p className={styles.title}>{dataItem.title} </p>
                <h2 className={styles.price}>{dataItem.price} BYN</h2>
                <p>{dataItem.count}</p>
                <p>{dataItem.adress}</p>
                <div className={styles.number}>
                    <a href={'tel:' + dataItem.number}>{dataItem.number}</a>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={handleEdit}>
                        {t.add.edit}
                    </button>
                    <button className={styles.button} onClick={handleDelete}>
                        {t.add.delete}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductsCard;
