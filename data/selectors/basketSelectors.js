import {createSelector} from 'reselect';


export const getBasketSelector = state => state.basket;

export const getProductList = createSelector([getBasketSelector], state => state.productList);
export const getProductElements = createSelector([getBasketSelector], state => {
    return Object.keys(state.productElements || []).map(key => state.productElements[key]);
});
export const getTotalPrice = createSelector([getBasketSelector], state => {
    let total = 0;

    state.productList.forEach(key => {
        const _price = state.productElements[key].price;
        const _count = state.productElements[key].app_count;

        total = total + (_price * _count);
    });

    return total;
});