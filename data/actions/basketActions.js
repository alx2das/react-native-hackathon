import {createAction} from '../../common/helpers/actions';


export const addProduct = createAction('BASKET.ADD_PRODUCT');
export const clearBasket = createAction('BASKET.CLEAR');

export const deleteProduct = createAction('BASKET.DELETE_PRODUCT');
export const countPlus = createAction('BASKET.COUNT_PLUS');
export const countMinus = createAction('BASKET.COUNT_MINUS');