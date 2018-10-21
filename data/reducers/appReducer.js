import * as action from '../actions/appActions';


const initialState = {
    authorizeApp: false
};
const actionHandlers = {
    [action.setAppAuthorize]: (state, {authorize}) => {
        return Object.assign({}, state, {
            authorizeApp: authorize
        });
    }
};


export {initialState, actionHandlers};
export default createReducer => createReducer(initialState, actionHandlers);