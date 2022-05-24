import config from "../../config.json";
import axios from "axios";
import token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/api";

const AuthUserCompleteRegistration = (data) => {
  console.log(data);
  console.log("token ", token.getAccessToken());
  return axios({
    method: "post",
    url: APIEndpoint + "/update-profile",
    data: {
      firstname: data["First Name"],
      lastname: data["Last Name"],
      nic: data["NIC"],
      contact_no: data["Contact Number"],
      email: data["Email"],
      birthday: data["Birthday"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getUser = () => {
    return axios({
        method: 'get',
        url: APIEndpoint + '/user/user',
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

export default{
    AuthUserCompleteRegistration,
    getUser,
}
