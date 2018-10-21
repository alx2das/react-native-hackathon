// Reducers...
import appReducer from './reducers/appReducer';
import productReducer from './reducers/productReducer';
import basketReducer from './reducers/basketReducer';
import orderReducer from './reducers/orderReducer';

// Sagas...
import appSaga from './sagas/appSaga';
import productSaga from './sagas/productSaga';
import orderSaga from './sagas/orderSaga';


// Export...
export const getReducers = createReducer => ({
    app: appReducer(createReducer),
    product: productReducer(createReducer),
    basket: basketReducer(createReducer),
    order: orderReducer(createReducer)
});
export const getSagas = () => ([
    appSaga(),
    productSaga(),
    orderSaga()
]);