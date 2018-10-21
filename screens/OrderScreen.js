import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {StyleSheet, View, ScrollView, Platform, Text} from 'react-native';
import IconVectorCard from 'react-native-vector-icons/FontAwesome';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import {Button, TouchableOpacity, Title, Spinner} from '@shoutem/ui';

import * as action from '../data/actions/orderAction';
import * as selector from '../data/selectors/orderSelector';


const mapStateToProps = state => ({
    orderState: selector.getOrderSelector(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({
    sendOrder: action.sendOrder.request
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class OrderScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Title style={{fontSize: 16}}>Оформление заказа</Title>,
            headerLeft: (
                <Button onPress={() => navigation.navigate('Basket')}>
                    <IconVector
                        name='arrow-back'
                        style={{fontSize: 22, color: '#717d83'}}
                    />
                </Button>
            ),
        };
    };

    componentDidUpdate(prevProps) {
        if (prevProps.orderState.loading && this.props.orderState.success) {
            this.props.navigation.navigate('ProductList');
            alert('Оплата успешно проведина');
        }

        if (prevProps.orderState.loading && this.props.orderState.failure) {
            alert('В процессе загрузки произошла ошибка');
        }
    }

    onSendOrder = () => {
        if (!this.props.orderState.loading)
            this.props.sendOrder();
    };

    render() {
        const {
            orderState
        } = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={{flex: 1, paddingVertical: 20, justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 20, color: '#717d83'}}>Выберите способ
                            оплаты</Text>
                    </View>
                    <View style={styles.cardBox}>
                        <View style={styles.cardBoxCol}>
                            <TouchableOpacity onPress={this.onSendOrder}>
                                <IconVectorCard
                                    style={styles.cardBoxColIcon}
                                    name='cc-mastercard'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardBoxCol}>
                            <TouchableOpacity onPress={this.onSendOrder}>
                                <IconVectorCard
                                    style={styles.cardBoxColIcon}
                                    name='cc-visa'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {orderState.loading &&
                    <View style={styles.getStartedContainer}>
                        <Text style={styles.getStartedText}>
                            Выполняется оплата,
                        </Text>
                        <Text style={styles.getStartedText}>
                            пожалуйста подождите.
                        </Text>
                        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                            <Spinner />
                        </View>
                    </View>}
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },

    cardBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 40
    },
    cardBoxCol: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardBoxColIcon: {
        fontSize: 100
    },


    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
        paddingTop: 50
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
});