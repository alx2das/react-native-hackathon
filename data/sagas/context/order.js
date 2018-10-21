import axios from 'axios';
import * as appConfig from '../../../appConfig';
import {url, token} from '../../../common/helpers/url';
import dateHelper from '../../../common/helpers/dateHelper';


export const postAssociate = () => {
    return axios({
        method: 'post',
        url: url(`/fn/v1/associate/${appConfig.retailPointID}`),
        headers: {
            'Authorization': "Basic " + token
        }
    }).then(res => res.data);
};

export const postDoc = ({id, docNum, inventPositions, moneyPositions}, token) => {
    const data = {
        method: 'post',
        url: url(`/fn/v1/doc`),
        data: {
            id,
            checkoutDateTime: dateHelper.dateFormat(new Date(), 'isoDateTime'),
            docNum,
            docType: "SALE",
            printReceipt: true,
            email: "test@example.com",
            inventPositions,
            moneyPositions,
            responseURL: "https://internet.shop.ru/order/982340931/checkout?completed=1"
        },
        headers: {
            'Authorization': "Basic " + token
        }
    };

    return axios(data).then(res => res.data);
};