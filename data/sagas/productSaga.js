import {all, takeEvery, fork, put, call} from 'redux-saga/effects';
import * as appConfig from '../../appConfig';

import * as action from '../actions/productActions';
import * as context from './context/product'


function* getProductSaga() {
    try {
        const response = yield call(context.getList, appConfig.retailPointID, {});

        // Нормализуем данные
        const {productList, productElements} = (response.data || []).reduce((accumulate, product) => {
            const productList = accumulate.productList;
            const productElements = accumulate.productElements;

            productList.push(product.inventCode);
            productElements[product.inventCode] = product;

            return {
                productList,
                productElements
            };
        }, {productList: [], productElements: {}});

        yield put(action.getProduct.success({
            productList,
            productElements,

            position: response.pos,
            total: response.total_count
        }));
    } catch (err) {
        console.log(err);
    }
}


export default function* () {
    yield all([
        takeEvery(action.getProduct.request, getProductSaga)
    ]);
}