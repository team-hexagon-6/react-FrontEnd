import axios from "axios";

const register = (data) => {

    return axios({
        method: 'post',
        url: 'http://localhost:3500/auth/register',
        data: {
            employee_id: data.user_id,
            employee_type: data.user_type,
            password: data.password
        }
    });

}

export default {
    register
}