import {all, takeEvery, call, select, put} from 'redux-saga/effects';
import uuidv4 from 'uuid/v4';
import base64 from 'base-64';

import * as context from './context/order';
import * as action from "../actions/orderAction";
import * as actionBasket from "../actions/basketActions";
import * as selectorBasket from '../selectors/basketSelectors';


function* senOrderSaga() {
    try {
        const basket = yield select(selectorBasket.getProductElements);
        const {userName, password} = yield call(context.postAssociate);
        const token = base64.encode(`${userName}:${password}`);

        let sum = 0;

        const inventPositions = Object.keys(basket)
            .filter(key => basket[key].app_count > 0)
            .map(key => {
                sum = sum + (basket[key].price * basket[key].app_count);

                return {
                    barcode: basket[key].barcode,
                    discSum: 0,
                    name: basket[key].name,
                    price: basket[key].price,
                    quantity: basket[key].app_count,
                    vatTag: 1107
                };
            });

        yield call(context.postDoc, {
            id: uuidv4(),
            docNum: +(new Date()),
            inventPositions,
            moneyPositions: [{
                paymentType: "CARD",
                sum
            }]
        }, token);

        yield put(actionBasket.clearBasket());
        yield put(action.sendOrder.success());
    } catch (err) {
        yield put(action.sendOrder.failure());
    }
}


export default function* () {
    yield all([
        takeEvery(action.sendOrder.request, senOrderSaga)
    ]);
}