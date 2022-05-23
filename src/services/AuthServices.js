import config from "../config.json";
import axios from "axios";
import token from "./Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + '/auth';

const register = (data) => {
  console.log(data);

  return axios({
    method: "post",
    url: APIEndpoint + '/register',
    data: {
      employee_id: data.user_id,
      employee_type: data.user_type,
      password: data.password,
    },
  });
};

const getusertypes = () => {
  return axios({
    method: "get",
    url: APIEndpoint + '/user-types',
    headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};


const login = async (data) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: APIEndpoint + '/login',
    data: {
      user_id: data.username,
      password: data.password,
    },
  });
  console.log("response", response);
  token.setAccessToken(response.data.access_token);
  return response;
};

export default {
  register,
  login,
  getusertypes
}

