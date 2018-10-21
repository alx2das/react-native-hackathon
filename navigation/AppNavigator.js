import React from 'react';
import {createStackNavigator} from 'react-navigation';

import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import BasketScreen from '../screens/BasketScreen';
import OrderScreen from '../screens/OrderScreen';


export default createStackNavigator({
    ProductList: {
        screen: ProductListScreen
    },
    ProductEdit: {
        screen: ProductEditScreen
    },
    Basket: {
        screen: BasketScreen
    },
    Order: {
        screen: OrderScreen
    }
}, {
    initialRouteName: 'ProductList',
});
