import config from "../../config.json";

import axios from "../HttpServices";

import token from "../Token"

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/api/user';

// const getDoctors = (skip, take, search) => {
//     const axiosPrivate = useAxiosPrivate();

//     let query = '/api/user' + `/doctors?skip=${skip}&take=${take}`;
//     if (search)
//         query += `&search_by=${search}`;


//     return axiosPrivate.get(query, {
//         headers: { Authorization: `Bearer ${token.getAccessToken()}` }
//     });
// };




// deshan method
const getDoctors = (skip, take, search) => {
    let query = `/doctors?skip=${skip}&take=${take}`;
    if (search)
        query += `&search_by=${search}`;
    return axios({
        method: 'get',
        url: APIEndpoint + query,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
        // withCredentials: true
    });
};

const getExaminers = (skip, take, search) => {
    let query = `/examiners?skip=${skip}&take=${take}`;
    if (search)
        query += `&search_by=${search}`;
    return axios({
        method: 'get',
        url: APIEndpoint + query,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` },
        // withCredentials: true
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