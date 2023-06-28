import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import styles from './ItemProducts.module.sass';
import Loader from '../../../ui/loader/loader';
import { productActions } from '../../../store/product/productSlice';
import useTranslation from '../../../hooks/useTranslation';
import getRelatedProducts from '../../../api/products/getRelatedProducts';
import { Header } from '../../../ui/header/header';
import { updatedProductActions } from '../../../store/product/updateProduct';
import { ProductType } from '../../../types/productsTypes';
import ProductsCard from '../cardProducts/cardProduct';

export default function ItemProduct() {
    const dispatch = useAppDispatch();
    const update = useAppSelector((state) => state.updatedProduct.product);
    const [relatedProduct, setRelatedProduct] = useState<ProductType[]>([]);
    const product = useAppSelector((state) => state.product.product);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedImg, setEditedImg] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedRelated, setEditedRelated] = useState('');
    const [editedRajon, setEditedRajon] = useState('');
    const [editedCount, setEditedCount] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedNumber, setEditedNumber] = useState('');
    const loading = useAppSelector((state) => state.product.loading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const productId = +(id ?? 0);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product`);
    };

    useEffect(() => {
        dispatch(productActions.getProduct(productId));
    }, [id]);

    useEffect(() => {
        if (product) {
            setEditedTitle(product.title || '');
            setEditedImg(product.img || '');
            setEditedRajon(product.rajon || '')
            setEditedRelated(product.related ? product.related.join(',') : '');
            setEditedPrice(product.price !== null ? product.price.toString() : '');
            setEditedCount(product.count || '');
            setEditedAddress(product.adress || '');
            setEditedNumber(product.number || '');
        }
    }, [product]);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        setIsModalOpen(false);
        const updatedProduct = {
            id: productId,
            updatedProduct: {
                id: productId,
                rajon: editedRajon,
                related: editedRelated.split(',').map(Number),
                img: editedImg,
                title: editedTitle,
                price: parseInt(editedPrice),
                count: editedCount,
                adress: editedAddress,
                number: editedNumber
            }
        };
        dispatch(updatedProductActions.updateProduct(updatedProduct));
        window.location.reload();
    };
    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (product && product.related) {
                const relatedIds = product.related;
                const products = await getRelatedProducts(relatedIds);
                setRelatedProduct(products);
            }
        };

        fetchRelatedProducts();
    }, [product]);


    return (
        <div className={styles.containerProd}>
            <Header />
            {loading && <Loader />}
            <div className={styles.blockButton}>
                <button onClick={handleClick} className={styles.back}>
                    {t.back.button}
                </button>
                <button onClick={handleOpenModal} className={styles.button}>
                    {t.add.edit}
                </button>
            </div>
            {product && (
                <section className={styles.product}>
                    <div className={styles.image}>
                        <img src={product.img} alt={product.title} />
                    </div>
                    <div className={styles.text}>
                        <p className={styles.title}>{product.title}</p>
                        <h2 className={styles.price}>{product.price} BYN</h2>
                        <p>{product.count}</p>
                        <p>{product.adress}</p>
                        <div className={styles.number}>
                            <a href={'tel:' + product.number}>{product.number}</a>
                        </div>
                    </div>
                </section>
            )}
            <h2>С этим покупают/похожие товары:</h2>
            <div className={styles.productContainer}>
                {relatedProduct.map((related) => (
                    <ProductsCard key={related.id} dataItem={related} img={related.img} id={related.id} t={t} />
                ))}
            </div>
            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Edit Product</h2>
                        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>&times;</button>
                        <input
                            className={styles.modalInput}
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="text"
                            value={editedImg}
                            onChange={(e) => setEditedImg(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="text"
                            value={editedRajon}
                            onChange={(e) => setEditedRajon(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="text"
                            value={editedRelated}
                            onChange={(e) => setEditedRelated(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="number"
                            value={editedPrice}
                            onChange={(e) => setEditedPrice(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="string"
                            value={editedCount}
                            onChange={(e) => setEditedCount(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="text"
                            value={editedAddress}
                            onChange={(e) => setEditedAddress(e.target.value)}
                        />
                        <input
                            className={styles.modalInput}
                            type="tel"
                            value={editedNumber}
                            onChange={(e) => setEditedNumber(e.target.value)}
                        />
                        <button onClick={handleSaveChanges} className={styles.button}>
                            {t.add.edit}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
