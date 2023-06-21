import React from 'react';
import styles from './carousel.module.sass';
import Slider from 'react-slick';

export const MyImageSlider: React.FC = () => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 700,
        slidesToShow: 2,
        slidesToScroll: 2,
    };

    return (
        <div className={styles.slide}>
            <Slider {...settings}>
                <div>
                    <img src={'/grSlide2.jpg'} alt="WebSite slide" />
                </div>
                <div>
                    <img src={'/grSlide1.jpg'} alt="WebSite slide" />
                </div>
                <div>
                    <img src={'/grSlide.jpg'} alt="WebSite slide" />
                </div>
                <div>
                    <img src={'/grSlide6.jpg'} alt="WebSite slide" />
                </div>
                <div>
                    <img src={'/grSlide3.jpg'} alt="WebSite slide" />
                </div>
                <div>
                    <img src={'/grSlide4.jpg'} alt="WebSite slide" />
                </div>
            </Slider>
        </div>
    );
};
