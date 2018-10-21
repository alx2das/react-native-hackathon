import * as action from '../actions/orderAction';


const initialState = {
    loading: false,
    success: null,
    failure: null
};
const actionHandlers = {
    [action.sendOrder.request]: state => {
        return Object.assign({}, state, {
            loading: true,
            success: null
        });
    },
    [action.sendOrder.success]: state => {
        return Object.assign({}, state, {
            loading: false,
            success: true,
            failure: null
        });
    },
    [action.sendOrder.failure]: state => {
        return Object.assign({}, state, {
            loading: false,
            success: null,
            failure: true
        });
    },
};


export {initialState, actionHandlers};
export default createReducer => createReducer(initialState, actionHandlers);