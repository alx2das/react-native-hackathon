import {createSelector} from 'reselect';


export const getProductSelector = state => state.product;


export const loading = createSelector([getProductSelector], state => state.loading);
export const getProductList = createSelector([getProductSelector], state => state.productList);
export const getProductElements = createSelector([getProductSelector], state => state.productElements);
export const getDetailElement = createSelector([getProductSelector], state => state.productDetail);