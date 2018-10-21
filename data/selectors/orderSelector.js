import {createSelector} from 'reselect';


export const getOrderSelector = state => state.order;

export const getLoading = createSelector([getOrderSelector], state => state.loading);