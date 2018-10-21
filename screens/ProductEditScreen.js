import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, View, Text} from 'react-native';
import {
    Screen, Button, TouchableOpacity, Title,
    InlineGallery, Divider, Row, Subtitle, Caption,
    View as UIView, Icon
} from '@shoutem/ui';

import {IMAGES} from '../constants/product';

import * as actionBasket from '../data/actions/basketActions';
import * as selector from '../data/selectors/productSelector';
import accounting from "accounting";


const mapStateToProps = state => ({
    product: selector.getDetailElement(state)
});
const mapDispatchToProps = dispatch => bindActionCreators({
    addToBasket: actionBasket.addProduct
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductEditScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Title style={{fontSize: 16}}>Просмотр товара</Title>,
            headerLeft: (
                <Button onPress={() => navigation.navigate('ProductList')}>
                    <IconVector
                        name='arrow-back'
                        style={{fontSize: 22, color: '#717d83'}}
                    />
                </Button>
            ),
            headerRight: (
                <Button onPress={() => navigation.navigate('Basket')}>
                    <IconVector
                        name='shopping-cart'
                        style={{fontSize: 22, right: 10, color: '#717d83'}}
                    />
                </Button>
            )
        };
    };

    constructor(props) {
        super(props);

        const photos = IMAGES.map(img => ({
            source: {
                uri: img
            }
        }));

        this.state = {
            photos,
            btn: 'Добавить в корзину'
        };
    }

    onAddBasket = () => {
        this.props.addToBasket({
            productID: this.props.product.inventCode,
            product: this.props.product
        });
        this.setState({
            btn: 'Товар в корзине'
        })
    };

    render() {
        const product = this.props.product;

        return (
            <Screen style={styles.container}>
                <ScrollView style={styles.container}>
                    <View>
                        <InlineGallery
                            styleName="large-wide"
                            data={this.state.photos}
                        />
                        <Divider styleName='line' />
                    </View>

                    <View style={{flex: 1}}>
                        <Row styleName="small">
                            <Icon name="right-arrow" />
                            <Text>{product.name}</Text>
                        </Row>
                        <Row styleName="small">
                            <Icon name="cart" />
                            <Text>
                                {accounting.formatNumber(product.price, 2, ' ')}&nbsp;&#x20bd;
                            </Text>
                        </Row>
                        <Divider styleName='line' />
                        <Row>
                            <UIView styleName="vertical">
                                <UIView styleName="horizontal space-between">
                                    <Subtitle>Описание товара</Subtitle>
                                </UIView>
                                <Text styleName="multiline">
                                    Banjo tote bag bicycle rights, High Life sartorial cray
                                    craft beer whatever street art fap. Hashtag typewriter
                                    banh mi, squid keffiyeh High.
                                </Text>
                            </UIView>
                        </Row>
                    </View>

                </ScrollView>


                <TouchableOpacity onPress={this.onAddBasket} style={styles.btnPay}>
                    <View style={styles.btnPayView}>
                        <View style={styles.btnPayViewCol}>
                            <Title style={styles.btnPayViewText}>{this.state.btn}</Title>
                        </View>
                    </View>
                </TouchableOpacity>
            </Screen>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
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
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center'
    },
    btnPayViewText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
};