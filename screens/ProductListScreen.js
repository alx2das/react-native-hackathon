import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import accounting from 'accounting';
import IconVector from 'react-native-vector-icons/MaterialIcons';
import {
    Screen, ListView, View, Subtitle,
    Button, TouchableOpacity, Title,
    GridRow, Card, Image, Caption, Text
} from '@shoutem/ui';
import {MEASURE_LABELS} from '../constants/product';


import * as action from '../data/actions/productActions';
import * as actionBasket from '../data/actions/basketActions';
import * as selector from '../data/selectors/productSelector';


const styles = {
    captionAddCart: {
        position: 'absolute',
        right: 0,
        bottom: -9
    },
    captionAddCartBtn: {
        height: 30,
    },
    captionAddCartIcon: {
        fontSize: 20,
        margin: 0,
        padding: 0,
        position: 'absolute',
        right: 0,
        color: '#717d83'
    },
    contBasket: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 100,

    }
};

const mapStateToProps = state => ({
    loading: selector.loading(state),

    productList: selector.getProductList(state),
    productElements: selector.getProductElements(state),
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getProduct: action.getProduct.request,
    addToBasket: actionBasket.addProduct,
    setDetail: action.setDetail
}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductEditScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: <Title style={{fontSize: 16}}>Товары</Title>,
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

    componentDidMount() {
        this.props.getProduct();
    }

    onShowDetail = key => {
        this.props.setDetail({key});
        this.props.navigation.navigate('ProductEdit');
    };

    onAddBasket = key => {
        this.props.addToBasket({
            productID: key,
            product: this.props.productElements[key]
        });
    };

    renderRow = rowData => {
        const productElements = this.props.productElements;
        const cellViews = rowData.map((key, id) => {
            const product = productElements[key];
            return (
                <TouchableOpacity key={id} styleName='flexible' onPress={() => this.onShowDetail(key)}>
                    <Card styleName='flexible'>
                        <Image
                            styleName='medium-wide'
                            source={{
                                uri: product.app_img || 'https://pp.userapi.com/c627226/v627226588/63334/AjoO2mIM5XU.jpg'
                            }}
                        />
                        <View styleName='content'>
                            <Subtitle numberOfLines={1}>
                                {product.name}
                            </Subtitle>
                            <View styleName='horizontal'>
                                <Caption styleName='collapsible' numberOfLines={2}>
                                    {accounting.formatNumber(product.price, 2, ' ')}
                                    &nbsp;&#x20bd;/{MEASURE_LABELS[product.measure]}
                                </Caption>
                                <Caption style={styles.captionAddCart}>
                                    <Button style={styles.captionAddCartBtn} onPress={() => this.onAddBasket(key)}>
                                        <IconVector
                                            style={styles.captionAddCartIcon}
                                            name='add-shopping-cart'
                                        />
                                    </Button>
                                </Caption>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            );
        });

        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    };

    render() {
        const productList = this.props.productList;
        const productData = GridRow.groupByRows(productList, 2);

        return (
            <Screen>
                <ListView
                    data={productData}
                    renderRow={this.renderRow}
                />
            </Screen>
        );
    }
}