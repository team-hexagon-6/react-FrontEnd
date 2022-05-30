import config from "../../config.json";
import axios from "../HttpServices";
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

const changeActivation = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/user/change-active",
    data: {
      user_id: data["user_id"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}

const updatePasswordByUser = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/user/update-password-by-user",
    data: {
      new_password: data["password"],
      old_password: data["old_password"],
      user_id: data["user_id"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}

export default {
  updateprofile,
  getUser,
  changeActivation,
  updatePasswordByUser,
}
