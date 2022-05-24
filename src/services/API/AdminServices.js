import config from "../../config.json";
import axios from "axios";
import token from "../Token"

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/api/user';

const getDoctors = (skip, take) => {
    return axios({
        method: 'get',
        url: APIEndpoint + `/doctors?skip=${skip}&take=${take}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const getExaminers = (skip, take) => {
    return axios({
        method: 'get',
        url: APIEndpoint + `/examiners?skip=${skip}&take=${take}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const updatePassword = (data) => {
    return axios({
        method: "post",
        url: APIEndpoint + '/update-password-by-admin',
        data: {
            new_password: data.password,
            user_id: data.user_id,
        },
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

export default {
    getDoctors,
    getExaminers,
    updatePassword,
}