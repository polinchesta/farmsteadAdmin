import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './auth/authSlice';
import settingsReducer from './settings/settingsSlice';
import productsReducer from './products/productsSlice';
import farmsteadReducer from './farmstead/farmsteadSlice';
import farmsteadsReducer from './farmsteads/farmsteadsSlice';
import productReducer from './product/productSlice';
import relatedProductsReducer from './RelatedProduct/relatedProduct';
import updatedProductReducer from './product/updateProduct';
import productOrderReducer from './product/orderSlice';
import farmsteadOrderReducer from './farmstead/orderSlice';
import farmsteadBookingReducer from './farmstead/booking'

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  product: productReducer,
  products: productsReducer,
  farmstead: farmsteadReducer,
  farmsteads: farmsteadsReducer,
  relatedProducts: relatedProductsReducer,
  updatedProduct: updatedProductReducer,
  orderProduct: productOrderReducer,
  orderFarmstead: farmsteadOrderReducer,
  bookingFarmstead: farmsteadBookingReducer

});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
