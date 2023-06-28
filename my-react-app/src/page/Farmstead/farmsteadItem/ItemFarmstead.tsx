import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import Loader from '../../../ui/loader/loader';
import styles from './ItemFarmstead.module.sass';
import useTranslation from '../../../hooks/useTranslation';
import 'leaflet/dist/leaflet.css';
import { farmsteadActions } from '../../../store/farmstead/farmsteadSlice';
import { Header } from '../../../ui/header/header';
import { updatedFarmsteadActions } from '../../../store/farmstead/updateFarmstead';
import { CommentType, ImageType } from '../../../types/farmsteadsTypes';

export default function ItemFarmstead() {
    const dispatch = useAppDispatch();
    const farmstead = useAppSelector((state) => state.farmstead.farmstead);
    const loading = useAppSelector((state) => state.farmstead.loading);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showVideoPopover, setShowVideoPopover] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedTitleVideo, setEditedTitleVideo] = useState('');
    const [editedUrl, setEditedUrl] = useState('');
    const [editedHouse, setEditedHouse] = useState('');
    const [editedText, setText] = useState('');
    const [editedTextAll, setTextAll] = useState('');
    const [editedLatitude, setLatitude] = useState('');
    const [editedLongitude, setLongitude] = useState('');
    const [editedImage, setEditedImage] = useState<ImageType[]>([]);
    const [editedPlace, setEditedPlace] = useState('');
    const [editedContact, setEditedContact] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedImg, setEditedImg] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [editedTop, setEditedTop] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const { t } = useTranslation();
    const farmsteadId = +(id ?? -1);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/farmstead`);
    };

    useEffect(() => {
        if (farmsteadId) {
            dispatch(farmsteadActions.getFarmstead(farmsteadId));
        }
    }, [farmsteadId]);

    useEffect(() => {
        if (farmstead) {
            setEditedTitle(farmstead.title || '');
            setEditedImg(farmstead.img || '');
            setEditedTitleVideo(farmstead.titleVideo || '');
            setEditedUrl(farmstead.url || '');
            setEditedHouse(farmstead.house || '');
            setText(farmstead.text || '');
            setEditedAddress(farmstead.adres || '')
            setTextAll(farmstead.textAll || '');
            setLatitude(farmstead.latitude !== null ? farmstead.latitude.toString() : '');
            setLongitude(farmstead.longitude !== null ? farmstead.longitude.toString() : '');
            setEditedTop(farmstead.top !== null ? farmstead.top.toString() : '');
            setEditedEmail(farmstead.email || '');
            setEditedContact(farmstead.contact || '');
            setEditedPlace(farmstead.place || '');
            setEditedPrice(farmstead.price !== null ? farmstead.price.toString() : '');
            setEditedImage(farmstead.image || []);
        }
    }, [farmstead]);


    const handleThumbnailClick = (index: number) => {
        setSelectedImage(index);
    };

    const handlePopoverClick = () => {
        setShowVideoPopover(true);
    };

    const handleVideoClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowVideoPopover(false);
    };

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

    function generateUUID(): number {
        return Date.now();
    }

    const handleSaveChanges = () => {
        setIsModalOpen(false);
        const updatedFarmstead = {
            id: farmsteadId,
            updatedFarmstead: {
                id: farmsteadId,
                text: editedText,
                textAll: editedTextAll,
                url: editedUrl,
                titleVideo: editedTitleVideo,
                adres: editedAddress,
                title: editedTitle,
                longitude: parseInt(editedLongitude),
                latitude: parseInt(editedLatitude),
                house: editedHouse,
                place: editedPlace,
                price: parseInt(editedPrice),
                contact: editedContact,
                email: editedEmail,
                top: parseInt(editedTop),
                img: editedImg,
                image: editedImage,
            }
        };
        dispatch(updatedFarmsteadActions.updateFarmstead(updatedFarmstead));
        window.location.reload();
    };
    const handleImageChange = (index: number, value: string) => {
        setEditedImage((prevState) => {
            const updatedImage = [...prevState];
            updatedImage[index].img = value;
            return updatedImage;
        });
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    return (
        <div className={styles.container}>
            <Header />
            {loading && <Loader />}
            {farmstead && (
                <>
                    <div className={styles.typeContainer}>
                        <div className={styles.blockButton}>
                            <button onClick={handleClick} className={styles.back}>
                                {t.back.button}
                            </button>
                            <button onClick={handleOpenModal} className={styles.button}>
                                {t.add.edit}
                            </button>
                        </div>
                        <div className={styles.type}>
                            <h2>{farmstead.title}</h2>
                            <div key={farmstead.textAll}>
                                <div className={styles.block}>
                                    <div className={styles.gallery}>
                                        <div className={styles.thumbnailContainer}>
                                            {farmstead.image.map(
                                                (step: { img: string }, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.thumbnail} ${selectedImage === index
                                                            ? styles.activeThumbnail
                                                            : ''
                                                            }`}
                                                        onClick={() => handleThumbnailClick(index)}>
                                                        <img
                                                            className={styles.img}
                                                            src={step.img}
                                                            alt="thumbnail"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className={styles.bigImageContainer}>
                                            {selectedImage !== null && (
                                                <img
                                                    className={styles.bigImage}
                                                    src={farmstead.image[selectedImage].img} alt="bigImage" />
                                            )}
                                        </div>
                                    </div>
                                    <div className={styles.contacts}>
                                        <h3>{t.infoFarmstead.info}</h3>
                                        <p>{farmstead.price} BYN/ночь/с человека</p>
                                        <p>{farmstead.house}</p>
                                        <p>{farmstead.place}</p>
                                        <p>{farmstead.contact}</p>
                                        <p>{farmstead.email}</p>
                                        <p>{farmstead.adres}</p>
                                        {farmstead.url && (
                                            <div
                                                className={styles.videoPopover}
                                                onClick={handlePopoverClick}>
                                                <p className={styles.videoIcon}>
                                                    ▶ {t.video.watch}
                                                </p>
                                                {showVideoPopover && (
                                                    <>
                                                        {loading && <Loader />}
                                                        <div
                                                            className={styles.popoverOverlay}></div>
                                                        <div className={styles.videoContainer}>
                                                            <button
                                                                className={styles.closeButton}
                                                                onClick={handleVideoClose}>
                                                                &times;
                                                            </button>
                                                            <iframe
                                                                className={styles.video}
                                                                src={farmstead.url}
                                                                title={
                                                                    farmstead
                                                                        .titleVideo
                                                                }
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen></iframe>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className={styles.text}>{farmstead.textAll}</p>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h2>Edit Product</h2>
                                <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                                    &times;
                                </button>
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
                                    value={editedTitleVideo}
                                    onChange={(e) => setEditedTitleVideo(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedUrl}
                                    onChange={(e) => setEditedUrl(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedHouse}
                                    onChange={(e) => setEditedHouse(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedText}
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedTextAll}
                                    onChange={(e) => setTextAll(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedLatitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedLongitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedTop}
                                    onChange={(e) => setEditedTop(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedContact}
                                    onChange={(e) => setEditedContact(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="text"
                                    value={editedPlace}
                                    onChange={(e) => setEditedPlace(e.target.value)}
                                />
                                <input
                                    className={styles.modalInput}
                                    type="number"
                                    value={editedPrice}
                                    onChange={(e) => setEditedPrice(e.target.value)}
                                />
                                {farmstead.image.map((step: { img: string }, index: number) => (
                                    <input
                                        className={styles.modalInput}
                                        type="text"
                                        value={editedImage[index]?.img || ""}
                                        onChange={(e) => {
                                            handleImageChange(index, e.target.value);
                                        }}
                                    />))}
                                <button onClick={handleSaveChanges} className={styles.button}>
                                    {t.add.edit}
                                </button>
                            </div>
                        </div>
                    )}

                    {showScrollToTop && (
                        <div className={styles.scrollToTop} onClick={scrollToTop}>
                            &uarr;
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
