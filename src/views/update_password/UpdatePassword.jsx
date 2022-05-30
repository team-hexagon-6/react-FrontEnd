import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./UpdatePassword.css";
import UserServices from "../../services/API/UserServices";
import Validation from "../../Validation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../../components/loader/Loader";
import Messages from "../../helpers/Messages";

const UpdatePassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [loader, setLoader] = useState(false);

    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const [pwd_err, setPwdErr] = useState('');

    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();

        setPwdErr('');
        const { value, error } = Validation.userUpdatePwd({ password, re_password });

        if (error) {
            console.log(error);
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });
            if (errors.password)
                setPwdErr(errors.password);
            if (errors.re_password)
                setPwdErr(errors.re_password);

        }
        else {
            try {
                // const user_id = params.user_id;
                const user_id = location.state.user_id;
                const response = await UserServices.updatePasswordByUser({ password, old_password, user_id });
                if (response.status === 200) {            
                    Messages.SuccessMessage("Password Updated Successfully");
                    setTimeout(navigate('/dashboard'), 3000);
                }

            } catch (error) {
                Messages.ErrorMessage({
                    error: error,
                    custom_message: `Password update failed.`,
                  });
            }
        }
        setTimeout(() => {
            setLoader(false);
        }, 200);
    }
  

    if (loader) {
        return <Loader />
    } else {
        return (
            <div className="update_pwd">

                <HeaderTwo />

                <div className="col-sm-4 reg">

                    <h1 className="update_header">Update Password</h1>

                    <div className="image">
                        <img src="../../public/pwd.png" alt="" />
                    </div>

                    <div className="container reg_form justify-content-center">

                        <Form onSubmit={handleSubmit}>

                        <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="old_password"
                                        placeholder="Current Password"
                                        style={{ borderRadius: "20px" }}
                                        value={old_password}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            {old_password}
                            <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        style={{ borderRadius: "20px" }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </div>
                            {password}
                            <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Re-enter New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="re_password"
                                        placeholder="New Password"
                                        style={{ borderRadius: "20px" }}
                                        value={re_password}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                    {pwd_err != '' && <p className="error">{pwd_err}</p>}
                                </Form.Group>
                            </div>
                            {re_password}

                            <div className="d-flex justify-content-center ">
                                <Button type="submit" className="reg_button" style={{ borderRadius: "20px", marginTop: "10px" }}>
                                    Update
                                </Button>
                            </div>

                        </Form>

                    </div>

                </div>
          </div>
        );
    }
  
}
 
export default UpdatePassword;