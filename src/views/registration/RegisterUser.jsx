import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Validation from '../../Validation';
import AuthServices from '../../services/AuthServices';
import "./RegisterUser.css";
import HeaderOne from "../../components/headers/HeaderOne";

const RegisterUser = () => {

    const [user_id, setUserID] = useState('');
    const [user_type, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const [id_err, setIdErr] = useState('');
    const [type_err, setTypeErr] = useState('');
    const [pwd_err, setPwdErr] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIdErr('');
        setTypeErr('');
        setPwdErr('');

        const { value, error } = Validation.registration({ user_id, user_type, password, re_password });
        if (error) {
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });

            if (errors.user_id)
                setIdErr(errors.user_id.replace('"user_id"', 'User ID'));
            if (errors.user_type)
                setTypeErr(errors.user_type.replace('"user_type"', 'User Type'));
            if (errors.password)
                setPwdErr('Password you entered does not match');
            if (errors.re_password)
                setPwdErr('Two passwords do not match');

        } else {
            try {
                const response = await AuthServices.register({ user_id, user_type, password });
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className="register_user">

            <HeaderOne />

            <div className="col-sm-4 reg">

                <h1 className="reg_header">Register a User</h1>

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
                                    <div className="col-md-3">
                                        <input type="radio" value="doctor" name="user_type" onChange={(e) => setUserType(e.target.value)} /> Doctor
                                    </div>
                                    <div className="col-md-3">
                                        <input type="radio" value="examiner" name="user_type" onChange={(e) => setUserType(e.target.value)} /> Examiner
                                    </div>
                                </div>
                                {type_err != '' && <p className="error">{type_err}</p>}
                            </Form.Group>
                        </div>

                        <div className="justify-content-center row g-3 align-items-center">
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
                        </div>

                        <div className="row required"><label>All fields are required</label></div>

                        <div className="btn-container d-flex justify-content-center ">
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

export default RegisterUser;