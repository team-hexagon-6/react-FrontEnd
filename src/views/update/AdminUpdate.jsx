import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./AdminUpdate.css";
import AdminServices from "../../services/API/AdminServices";
import Validation from "../../Validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../../components/loader/Loader";

const AdminUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const [pwd_err, setPwdErr] = useState('');

    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();

        setPwdErr('');
        const { value, error } = Validation.adminUpdatePwd({ password, re_password });

        if (error) {
            const errors = {};
            error.details.map(item => {
                errors[item.path[0]] = item.message;
            });
            if (errors.password)
                setPwdErr('Password you entered does not match. Try again');
            if (errors.re_password)
                setPwdErr('Two passwords do not match. Try again');

        }
        else {
            try {
                const user_id = params.user_id;
                const response = await AdminServices.updatePassword({ password, user_id });
                if (response.status === 200) {
                    toast.success('Password Updated Successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(navigate('/allUsers'), 3000);
                }

            } catch (error) {
                toast.error(`Password update failed`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
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
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        style={{ borderRadius: "20px" }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Re-enter New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="re_password"
                                        placeholder="Password"
                                        style={{ borderRadius: "20px" }}
                                        value={re_password}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                    {pwd_err != '' && <p className="error">{pwd_err}</p>}
                                </Form.Group>
                            </div>

                            <div className="d-flex justify-content-center ">
                                <Button type="submit" className="reg_button" style={{ borderRadius: "20px", marginTop: "10px" }}>
                                    Update
                                </Button>
                            </div>

                        </Form>

                    </div>

                </div>


            <div className="container reg_form justify-content-center">
              <Form onSubmit={handleSubmit}>
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
                  </Form.Group>
                </div>
              </Form>
            </div>
          </div>
        );
    }
  }
      


    


export default AdminUpdate;
