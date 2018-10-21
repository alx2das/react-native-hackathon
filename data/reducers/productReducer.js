import * as action from '../actions/productActions';


const initialState = {
    loading: true,
    position: 0,
    total: 0,

    productList: [],
    productElements: {},

    productDetail: {}
};
const actionHandlers = {
    [action.getProduct.request]: state => {
        return Object.assign({}, state, {
            loading: true
        });
    },
    [action.getProduct.success]: (state, {productList, productElements, position, total}) => {
        const _productList = !position
            ? productList
            : [...state.productList, ...productList];

        return Object.assign({}, state, {
            loading: false,
            productList: _productList,
            productElements: Object.assign({}, state.productElements, productElements),
            position,
            total
        });
    },
    [action.getProduct.failure]: (state) => {
        return Object.assign({}, state, {
            loading: false
        });
    },


    [action.setDetail]: (state, {key}) => {
        return Object.assign({}, state, {
            productDetail: state.productElements[key]
        })
    }
};


export {initialState, actionHandlers};
export default createReducer => createReducer(initialState, actionHandlers);