import axios from "axios";


const register = (data) => {
    console.log(data);

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
    register,AuthUserCompleteRegistration
}