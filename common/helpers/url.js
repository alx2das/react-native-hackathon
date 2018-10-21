import base64 from 'base-64';
import * as appConfig from '../../appConfig';

const URL_BACK_OFFICE = appConfig.baseBackOffice;
const TOKEN_BACK_OFFICE = base64.encode(appConfig.baseAuthData);


const url = address => {
    return URL_BACK_OFFICE + address;
};

const token = TOKEN_BACK_OFFICE;


export default url;
export {
    url,
    token
};