import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingComponent from './LoadingComponent';
import AppNavigator from '../navigation/AppNavigator';

import * as selector from '../data/selectors/appSelector';


const mapStateToProps = state => ({
    isAuthorizeApp: selector.getAuthorizeApp(state)
});

@connect(mapStateToProps)
export default class RootComponent extends Component {
    render() {
        return this.props.isAuthorizeApp
            ? <AppNavigator />
            : <LoadingComponent />;
    }
}