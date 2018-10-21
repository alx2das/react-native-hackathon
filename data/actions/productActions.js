import {createAction, createRequestActions} from '../../common/helpers/actions';


export const getProduct = createRequestActions('PRODUCT.GET_LIST');
export const setDetail = createAction('PRODUCT.SET_DETAIL');