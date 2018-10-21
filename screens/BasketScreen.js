import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import {Platform, ScrollView, View, Text} from 'react-native';
import {
    Screen, Button, Title, ListView, View as UIView,
    TouchableOpacity, Row, Text as UIText,
    Subtitle, Divider, Image, Caption
} from '@shoutem/ui';
import accounting from 'accounting';

import * as selector from '../data/selectors/basketSelectors';
import * as action from '../data/actions/basketActions';


const mapStateToProps = state => ({
    productList: selector.getProductList(state),
    productElements: selector.getProductElements(state),

    totalPrice: selector.getTotalPrice(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({
    deleteProduct: action.deleteProduct,
    countPlus: action.countPlus,
    countMinus: action.countMinus
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class BasketScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Title style={{fontSize: 16}}>Корзина</Title>,
            headerLeft: (
                <Button onPress={() => navigation.navigate('ProductList')}>
                    <IconVector
                        name='arrow-back'
                        style={{fontSize: 22, color: '#717d83'}}
                    />
                </Button>
            )
        };
    };

    onSendOrder = () => {
        this.props.navigation.navigate('Order');
    };

    onShowProductList = () => {
        this.props.navigation.navigate('ProductList');
    };

    onCountPlus = key => {
        this.props.countPlus({key});
    };

    onCountMinus = key => {
        this.props.countMinus({key});
    };

    onDeleteProduct = key => {
        this.props.deleteProduct({key});
    };

    renderRow = product => {
        const key = product.inventCode;
        return (
            <TouchableOpacity>
                <Row>
                    <UIView styleName="vertical">
                        <UIView styleName="horizontal space-between">
                            <Subtitle>{product.name}</Subtitle>
                            <Button onPress={() => this.onDeleteProduct(key)} style={{position: 'absolute', top: 0, right: 0}}>
                                <IconVector
                                    name='close'
                                    style={{fontSize: 22, color: '#717d83'}}
                                />
                            </Button>
                        </UIView>


                        <UIText styleName="multiline">
                            <View style={styles.countView}>
                                <TouchableOpacity onPress={() => this.onCountMinus(key)} style={styles.countViewBtn}>
                                    <IconVector
                                        style={styles.countViewIco}
                                        name='remove'
                                    />
                                </TouchableOpacity>
                                <View style={styles.countViewValue}>
                                    <Text style={styles.countViewText}>{product.app_count}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.onCountPlus(key)} style={styles.countViewBtn}>
                                    <IconVector
                                        style={styles.countViewIco}
                                        name='add'
                                    />
                                </TouchableOpacity>

                                <View style={styles.countViewTotal}>
                                    <IconVector
                                        style={styles.countViewIcoOperate}
                                        name='close'
                                    />
                                </View>
                                <View style={styles.countViewTotal}>
                                    <Text style={styles.countViewText}>
                                        {accounting.formatNumber(product.price, 2, ' ')}
                                    </Text>
                                </View>
                                <View style={styles.countViewTotal}>
                                    <IconVector
                                        style={styles.countViewIcoOperate}
                                        name='drag-handle'
                                    />
                                </View>
                                <View style={styles.countViewTotal}>
                                    <Text style={[styles.countViewText, styles.countViewRight]}>
                                        {accounting.formatNumber(product.app_total, 2, ' ')}&#x20bd;
                                    </Text>
                                </View>
                            </View>
                        </UIText>


                    </UIView>
                </Row>
                <Divider styleName='line'/>
            </TouchableOpacity>
        );
    };

    render() {
        const productList = this.props.productElements;
        const totalPrice = this.props.totalPrice;
        const isShowList = productList && productList.length > 0;

        return (
            <Screen style={styles.container}>
                <ScrollView style={styles.container}>
                    {isShowList &&
                    <ListView
                        style={{flex: 1}}
                        styleName='list'
                        data={productList}
                        renderRow={this.renderRow}
                    />}

                    {!isShowList &&
                    <View style={styles.getStartedContainer}>
                        <Text style={styles.getStartedText}>
                            Оформление заказа не доступно,
                        </Text>
                        <Text style={styles.getStartedText}>
                            пока ваша корзина пуста.
                        </Text>
                        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                            <Button onPress={this.onShowProductList}>
                                <Text>Перейти к товарам</Text>
                            </Button>
                        </View>
                    </View>}
                </ScrollView>

                {isShowList && totalPrice > 0 &&
                <TouchableOpacity onPress={this.onSendOrder} style={styles.btnPay}>
                    <View style={styles.btnPayView}>
                        <View style={styles.btnPayViewCol}>
                            <Title style={styles.btnPayViewText}>Оформить заказ</Title>
                        </View>
                        <View style={[styles.btnPayViewCol]}>
                            <Title style={styles.btnPayViewTextTotal}>
                                {accounting.formatNumber(totalPrice, 2, ' ')}&nbsp;&#x20bd;
                            </Title>
                        </View>
                        <View style={styles.btnPayViewCol}>
                            <IconVector
                                style={styles.btnPayViewIcon}
                                name='send'
                            />
                        </View>
                    </View>
                </TouchableOpacity>}
            </Screen>
        );
    }
}

const styles = {
    container: {
        flex: 1
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
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },

    // Style product total
    countView: {
        flexDirection: 'row',
        paddingTop: 5
    },
    countViewBtn: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
    },
    countViewIco: {
        fontSize: 22,
        color: '#717d83'
    },
    countViewIcoOperate: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 16,
        color: '#717d83'
    },
    countViewValue: {
        width: 40,
        height: 30,
        justifyContent: 'center'
    },
    countViewText: {
        textAlign: 'center',
        fontSize: 14,
    },
    countViewTotal: {
        height: 30,
        justifyContent: 'center',
        right: 0
    },
    countViewRight: {
        fontWeight: 'bold',

    },

    // Кнопка "К оплате"
    btnPay: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgb(120, 180, 50)',
        height: 50,
    },
    btnPayView: {
        flex: 1,
        flexDirection: 'row'
    },
    btnPayViewCol: {
        flex: 3,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    btnPayViewText: {
        color: '#fff',
        fontSize: 13
    },
    btnPayViewTextTotal: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnPayViewIcon: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 22,
        fontWeight: 'bold'
    },
};