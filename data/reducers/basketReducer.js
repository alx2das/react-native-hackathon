import * as action from '../actions/basketActions';


const initialState = {
    productList: [],
    productElements: {},

    totalPrice: 0
};
const actionHandlers = {
    [action.addProduct]: (state, {productID, product}) => {
        return Object.assign({}, state, {
            productList: [...state.productList, productID],
            productElements: {
                ...state.productElements,
                [productID]: {
                    ...product,
                    app_count: 1,
                    app_total: product.price * 1
                }
            }
        })
    },
    [action.clearBasket]: state => {
        return Object.assign({}, state, initialState);
    },


    [action.deleteProduct]: (state, {key}) => {
        delete state.productElements[key];
        state.productList = state.productList.filter(e => e !== key);

        return Object.assign({}, state);
    },
    [action.countPlus]: (state, {key}) => {
        const app_count = state.productElements[key].app_count + 1;
        const app_total = state.productElements[key].price * app_count;

        return Object.assign({}, state, {
            productElements: Object.assign({}, state.productElements, {
                [key]: Object.assign({}, state.productElements[key], {
                    app_count,
                    app_total
                })
            })
        });
    },
    [action.countMinus]: (state, {key}) => {
        const app_count = state.productElements[key].app_count - 1;
        const app_total = app_count >= 0 ? state.productElements[key].price * app_count : 0;

        return Object.assign({}, state, {
            productElements: Object.assign({}, state.productElements, {
                [key]: Object.assign({}, state.productElements[key], {
                    app_count: app_count < 0 ? 0 : app_count,
                    app_total
                })
            })
        });
    },
};


export {initialState, actionHandlers};
export default createReducer => createReducer(initialState, actionHandlers);