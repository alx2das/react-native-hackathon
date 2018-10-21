import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';


export default class LoadingComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});