import Axios from "axios";
import Token from "./Token";
import config from "../config.json";
import jwtDecode from "jwt-decode";
import dayJS from "dayjs";
import Messages from "../helpers/Messages";


let bearer_token = Token.getAccessToken();
const axiosInstance = Axios.create({
    withCredentials: true,
    baseURL: config.DOMAIN_NAME,
    headers: { Authorization: `Bearer ${bearer_token}` }
})

axiosInstance.interceptors.request.use(async (req) => {
    if (!bearer_token) {
        bearer_token = Token.getAccessToken();
        req.headers.Authorization = `Bearer ${bearer_token}`
    }
    if (bearer_token) {
        bearer_token = Token.getAccessToken();
        const user = await jwtDecode(bearer_token);
        // unix time expired 
        const isExpired = dayJS(user.exp * 1000).isBefore(dayJS());
        console.log("expired :", isExpired);

        if (!isExpired) {
            req.headers.Authorization = `Bearer ${bearer_token}`
            return req;
        }

        try {
            // refresh token in cookie get the request
            const response = await Axios({
                method: "get",
                url: config.DOMAIN_NAME + "/auth/new-token",
                // credentials true
                withCredentials: true,
            })
            console.log("response :", response);

            Token.removeAccessToken();
            bearer_token = response.data.access_token;
            Token.setAccessToken(response.data.access_token);

            req.headers.Authorization = `Bearer ${bearer_token}`;
            console.log("bearer_token", req.headers.Authorization);
        } catch (err) {
            console.log("err :", err);
            Messages.error("Your session has expired. Please login again.");
            return Promise.reject(err);
        }
    }
    return req;

})

// axiosInstance.interceptors.response.use(null, async (error) => {
//     const expectedError =
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status < 500;

//     if (!expectedError) {
//         logger.log("loggerCalling", error);
//         console.log("logging for error");
//         toast.error("An Unexpected error occurred !");
//     }
//     return Promise.reject(error);
// });

export default axiosInstance;

// export default axios.create({
//     baseURL: config.DOMAIN_NAME
// });

// export const axiosPrivate = axios.create({
//     baseURL: config.DOMAIN_NAME,
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true
// });