import axios from 'axios';
import {url, token} from '../../../common/helpers/url';


export const isAuthorizeApp = () => {
    return axios
        .get(url('/v1/profile'));
};

export const authorizeApp = () => {
    return axios({
        method: 'get',
        url: url('/v1/profile'),
        headers: {
            'Authorization': "Basic " + token
        }
    });
};