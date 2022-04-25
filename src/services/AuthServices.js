import { DOMAIN_NAME } from "../config.json";
import axios from "axios";
import token from "./Token";


const register = (data) => {
  console.log(data);

  return axios({
    method: "post",
    url: DOMAIN_NAME + "/auth/register",
    data: {
      employee_id: data.user_id,
      employee_type: data.user_type,
      password: data.password,
    },
  });
};
const login = async (data) => {
  console.log(data);

  const response = await axios({
    method: "post",
    url: DOMAIN_NAME + "/auth/login",
    data: {
      user_id: data.username,
      password: data.password,
    },
  });
  console.log(response);
  token.setAccessToken(response.data.access_token);
};

const AuthUserCompleteRegistration = (data) =>{
    console.log(data);
   
    return axios({
        method: 'post',
        url: 'http://localhost:3500/api/update-profile',
        data: {
            firstname: data['First Name'],
            lastname: data['Last Name'],
            nic: data['NIC'],
            contact_no:data['Contact Number'],
            email:data['Email'],
            birthday :data['Birthday']
        }
    });

}

export default {
    register,AuthUserCompleteRegistration,login
}

