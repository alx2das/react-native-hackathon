import {all, fork, put, call} from 'redux-saga/effects';

import * as action from '../actions/appActions';
import * as context from './context/app';


function* initAppSaga() {
    try {
        yield call(context.isAuthorizeApp);
        yield put(action.setAppAuthorize({authorize: true}));
    } catch (err) {
        yield call(authorizeAppSaga);
    }
}

function* authorizeAppSaga() {
    try {
        yield call(context.authorizeApp);
        yield put(action.setAppAuthorize({authorize: true}));
    } catch (err) {
        yield put(action.setAppAuthorize({authorize: false}));
        console.log(err);
    }
}


export default function* () {
    return yield all([
        fork(initAppSaga)
    ]);
}