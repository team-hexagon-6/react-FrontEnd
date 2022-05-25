import config from "../../config.json";
import axios from "axios";
import token from "../Token";

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/api";

const updateprofile = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/user/update-profile",
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
    updateprofile,
    getUser,
}
