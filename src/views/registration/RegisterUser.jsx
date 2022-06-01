import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import Validation from '../../Validation';
import AuthServices from '../../services/AuthServices';
import "./RegisterUser.css";
import HeaderTwo from "../../components/headers/HeaderTwo";
import _503 from "../not_found/_503";
import { toast } from 'react-toastify';
import Loader from "../../components/loader/Loader";

import Messages from "../../helpers/Messages";

const RegisterUser = () => {

    // Taking query string values from url
    // const search = useLocation().search;
    // const name = new URLSearchParams(search).get('a');
    // console.log("Querystring: ", name);

    const [user_id, setUserID] = useState('');
    const [user_type, setUserType] = useState('');
    // const [password, setPassword] = useState('');
    // const [re_password, setRePassword] = useState('');

    const [id_err, setIdErr] = useState('');
    const [type_err, setTypeErr] = useState('');
    // const [pwd_err, setPwdErr] = useState('');
    const [userTypes, setUserTypes] = useState([]);

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIdErr('');
        setTypeErr('');
        // setPwdErr('');
        
        const { value, error } = Validation.registration({ user_id, user_type});
        if (error) {
            console.log(error);
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });

            if (errors.user_id)
                setIdErr(errors.user_id.replace('"user_id"', 'User ID'));
            if (errors.user_type)
                setTypeErr(errors.user_type.replace('"user_type"', 'User Type'));
            // if (errors.password)
            //     setPwdErr('Password you entered does not match');
            // if (errors.re_password)
            //     setPwdErr('Two passwords do not match');

        }
        else {
            try {
                setLoader(true);
                console.log(user_type);
                const response = await AuthServices.register({ user_id, user_type });
                if (response.status === 201) {
                    Messages.SuccessMessage("Registration Successfull");
                    setTimeout(() => {
                        setLoader(false);
                    }, 200);
                    setTimeout(navigate('/dashboard'), 3000);
                }
                


            } catch (error) {
                
                Messages.ErrorMessage({
                    error: error,
                    custom_message:`Registration Failed`
                  });
            }
        }
    }

    useEffect(() => {
        getUserTypes();
    }, [])

    const getUserTypes = async () => {
        try {
            const userType = await AuthServices.getusertypes();
            setUserTypes(userType.data.data);

        }
        catch (err) {
            // console.log(err);

        }
    }
    // console.log(userTypes);

    if (loader) {
        return <Loader />
    }
    else {

        if (userTypes) {
            return (
                <div className="register_user">

                    <HeaderTwo />

                    <div className="col-sm-4 reg">

                        <h1 className="reg_header">Register a User</h1>

                        <div className="image">
                            <img src="https://i.ibb.co/GJXcYwn/register.png" alt="" />
                        </div>


                        <div className="container reg_form justify-content-center">

                            <Form onSubmit={handleSubmit}>

                                <div className="justify-content-center row g-3 align-items-center">
                                    <Form.Group className="mb-3">
                                        <Form.Label>User ID</Form.Label>
                                        <Form.Control
                                            placeholder="User ID"
                                            style={{ borderRadius: "20px" }}
                                            value={user_id}
                                            onChange={(e) => setUserID(e.target.value)}
                                        />
                                        {id_err != '' && <p className="error">{id_err}</p>}
                                    </Form.Group>
                                </div>

                                <div className="justify-content-center row g-3 align-items-center">
                                    <Form.Group className="mb-3">
                                        <Form.Label>User type</Form.Label><br />
                                        <div className="row">
                                            {userTypes && userTypes.map((userType) =>
                                                <div className="col-md-3" key={userType.slug}>
                                                    <input type="radio" value={userType.slug} style={{margin: "10px"}} onChange name="user_type" onChange={(e) => setUserType(e.target.value)} />{userType.name}
                                                </div>
                                            )}
                                        </div>
                                        {type_err != '' && <p className="error">{type_err}</p>}
                                    </Form.Group>
                                </div>

                                {/* <div className="justify-content-center row g-3 align-items-center">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Default Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            style={{ borderRadius: "20px" }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {pwd_err != '' && <p className="error">{pwd_err}</p>}
                                    </Form.Group>
                                </div>
    
                                <div className="justify-content-center row g-3 align-items-center">
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Re-enter Default Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="re_password"
                                            placeholder="Password"
                                            style={{ borderRadius: "20px" }}
                                            value={re_password}
                                            onChange={(e) => setRePassword(e.target.value)}
                                        />
                                    </Form.Group>
                                </div> */}

                                {/* <div className="row required"><label>All fields are required</label></div> */}

                                <div className="btn-container d-flex justify-content-center " style={{marginBottom: "0"}}>
                                    <Button type="submit" className="reg_button" style={{ borderRadius: "20px" }}>
                                        Register
                                    </Button>
                                </div>

                            </Form>

                        </div>

                    </div>


                </div>
            );
        }
        else {
            return (
                <div>
                    <_503 />
                </div>

            );
        }
    }


}

export default RegisterUser;