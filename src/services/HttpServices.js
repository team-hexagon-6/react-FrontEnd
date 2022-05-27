import { Axios } from "axios";
import Token from "./Token";
import config from "../config.json";

let bearer_token = Token.getAccessToken();
const axiosInstance = Axios.create({
    baseURL: config.DOMAIN_NAME,
    headers: {Authorization: `Bearer ${bearer_token}`}
})

axiosInstance.interceptors.request.use( async (req) => {
    if (!bearer_token) {
        bearer_token = Token.getAccessToken();
        req.headers.Authorization = `Bearer ${bearer_token}`
    } 
    if (bearer_token){
        bearer_token = Token.getAccessToken();
        const user = await jwtDecode(bearer_token);
        // const isExpired = dayJS.unix.
    }
})