import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks';
import { Header } from '../../../ui/header/header';
import Loader from '../../../ui/loader/loader';
import { FarmsteadOrder } from '../../../types/farmsteadsTypes';
import { farmsteadBookingActions } from '../../../store/farmstead/booking';

const Booking = () => {
    const loading = useAppSelector((state) => state.bookingFarmstead.loading);
    const orderFarmstead = useAppSelector((state) => state.bookingFarmstead.order);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(farmsteadBookingActions.getFarmsteadBooking());
      }, []);
      
    return (
        <div>
            <Header />
            {loading && <Loader />}
            <h1>Усадьбы</h1>
            {Array.isArray(orderFarmstead) && orderFarmstead.length > 0 ? (
                orderFarmstead.map((orderFarmstead: FarmsteadOrder) => (
                    <div key={orderFarmstead.id}>
                        <h3>{orderFarmstead.title}</h3>
                        <p>ID заказа: {orderFarmstead.id}</p>
                        <p>Обращение: {orderFarmstead.name}</p>
                        <p>Почта: {orderFarmstead.email}</p>
                        <p>Номер мобильного телефона: {orderFarmstead.number}</p>
                        <p>Дата заказа: {orderFarmstead.time}</p>
                        <p>На какое число: {orderFarmstead.orderDate ? orderFarmstead.orderDate.toLocaleDateString() : 'N/A'}</p>
                        <p>ID усадьбы{orderFarmstead.farmsteadId}</p>
                        <p>Способ оплаты{orderFarmstead.oplata}</p>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
};

export default Booking;
