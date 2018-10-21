import {createSelector} from 'reselect';


export const getAppSelector = state => state.app;

export const getAuthorizeApp = createSelector([getAppSelector], state => state.authorizeApp);