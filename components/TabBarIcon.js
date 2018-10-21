import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';


import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Icon
                name={this.props.name}
                size={22}
                style={{marginBottom: -5}}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}