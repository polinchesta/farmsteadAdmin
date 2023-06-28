import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks';
import { ProductOrder } from '../../../types/productsTypes';
import { productOrderActions } from '../../../store/product/orderSlice';
import { farmsteadOrderActions } from '../../../store/farmstead/orderSlice';
import { Header } from '../../../ui/header/header';
import Loader from '../../../ui/loader/loader';
import { FarmsteadOrder } from '../../../types/farmsteadsTypes';

const Order = () => {
    const orders = useAppSelector((state) => state.orderProduct.order);
    const loading = useAppSelector((state) => state.orderProduct.loading);
    const orderFarmstead = useAppSelector((state) => state.orderFarmstead.order);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productOrderActions.getProductOrder());
        dispatch(farmsteadOrderActions.getFarmsteadOrder());
      }, []);
      
    return (
        <div>
            <Header />
            {loading && <Loader />}
            <h1>Продукты</h1>
            {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order: ProductOrder) => (
                    <div key={order.id}>
                        <h3>{order.title}</h3>
                        <p>Order ID: {order.id}</p>
                        <p>Customer Name: {order.name}</p>
                        <p>Email: {order.email}</p>
                        <p>Number: {order.number}</p>
                        <p>Day: {order.time}</p>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
            <h1>Усадьбы</h1>
            {Array.isArray(orderFarmstead) && orderFarmstead.length > 0 ? (
                orderFarmstead.map((orderFarmstead: FarmsteadOrder) => (
                    <div key={orderFarmstead.id}>
                        <h3>{orderFarmstead.title}</h3>
                        <p>Order ID: {orderFarmstead.id}</p>
                        <p>Customer Name: {orderFarmstead.name}</p>
                        <p>Email: {orderFarmstead.email}</p>
                        <p>Number: {orderFarmstead.number}</p>
                        <p>Day: {orderFarmstead.time}</p>
                    </div>
                ))
            ) : (
                <p>No orders available</p>
            )}
        </div>
    );
};

export default Order;
