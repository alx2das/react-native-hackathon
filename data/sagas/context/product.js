import axios from 'axios';
import url from '../../../common/helpers/url';
import {IMAGES} from '../../../constants/product';


export const getList = (retailPointId, params = {}) => {
    return axios
        .get(url(`/v1/retail-point/${retailPointId}/catalog/INVENTORY`, params))
        .then(res => ({
            data: (res.data.data).map((p, i) => ({
                ...p,
                app_img: IMAGES[i] || false
            })),
            pos: res.data.pos,
            total_count: res.data.total_count
        }));
};