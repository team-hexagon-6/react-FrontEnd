import config from "../../config.json";
import axios from "axios";
import token from "../Token"

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/api/user';

const getAllUsers = (skip, take) => {
    return axios({
        method: 'get',
        url: APIEndpoint + `/employees?skip=${skip}&take=${take}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

export default {
    getAllUsers,
}