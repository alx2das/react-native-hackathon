import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {createReducer} from 'redux-create-reducer';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';

import * as stores from '../data';


const getMiddleware = (...customMiddleware) => {
    let middleware = [...customMiddleware];
    let composerFunc = [];

    return [
        applyMiddleware(...middleware),
        ...composerFunc
    ];
};
const getReducer = () => {
    return {
        ...stores.getReducers(createReducer)
    };
};
const getRootSaga = () => {
    const sagas = stores.getSagas();

    return function* () {
        yield all(sagas);
    }
};
const myCreateStore = ({middleware, initState, reducers}) => {
    const appReducers = combineReducers({...reducers});
    const enhancer = compose(
        ...middleware
    );

    return createStore(
        appReducers,
        initState,
        enhancer
    );
};

export default () => {
    const initState = {};
    const sagaMiddleware = createSagaMiddleware();
    const reducers = getReducer();
    const middleware = getMiddleware(
        sagaMiddleware
    );
    const state = myCreateStore({
        middleware,
        initState,
        reducers
    });

    function runSaga() {
        const task = sagaMiddleware.run(getRootSaga());

        task.done.catch(err => {
            runSaga();
            console.log('Saga error:', err)
        });
    }

    runSaga();

    return {
        state
    };
};