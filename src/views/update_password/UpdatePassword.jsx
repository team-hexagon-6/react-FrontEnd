import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./UpdatePassword.css";
import UserServices from "../../services/API/UserServices";
import Validation from "../../Validation";
import { Row, Col,InputGroup } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "../../components/loader/Loader";
import Messages from "../../helpers/Messages";
import 'font-awesome/css/font-awesome.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from  '@fortawesome/free-solid-svg-icons'


const UpdatePassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [loader, setLoader] = useState(false);

    const [old_password, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    const [pwd_err, setPwdErr] = useState('');
    const [passwordShown,setPasswordShown]=useState({
        'current password':false,
        'new password':false,
        'renew password':false

    });
    const togglePassword=(e)=>{
        setPasswordShown({...passwordShown,[e]: !(passwordShown[e])});
    }

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
            console.log(errors)
            
            if (errors.password)
                setPwdErr(errors.password);
            else if (errors.re_password)
                setPwdErr(errors.re_password);


        }
        else {
            try {
                // const user_id = params.user_id;
                const user_id = location.state.user_id;
                const response = await UserServices.updatePasswordByUser({ password, old_password, user_id });
                if (response.status === 200) {            
                    Messages.SuccessMessage("Password Updated Successfully");
                    setTimeout(navigate('/logout'), 3000);
                }

            } catch (error) {
                Messages.ErrorMessage({
                    error: error,
                    // custom_message: `Password update failed.`,
                    custom_message: error.response.data.message,

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
                        <img src="https://i.ibb.co/W03rmc3/pwd.png" alt="" />
                    </div>

                    <div className="container reg_form justify-content-center">

                        <Form onSubmit={handleSubmit}>

                        <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3 fw-bold" controlId="formBasicPassword">
                                <Form.Label style={{ margin:'0px 0px 0px  75px'}}>Current Password</Form.Label>
                                <Row>
                                    <Col align='left' sm={8}>
                                    <Form.Control
                                        type={passwordShown['current password'] ? 'text':'password'}
                                        name="old_password"
                                        placeholder="Current Password"
                                        style={{ borderRadius: "20px",margin:'0px 0px 0px  70px'}}
                                        value={old_password}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    </Col>
                                    <Col sm={1}>
                                <FontAwesomeIcon style={{margin:'0px 0px 0px  10px'}} className='mt-2 fa-lg'  icon={passwordShown['current password'] ? faEye:faEyeSlash} onClick={()=>togglePassword('current password')}></FontAwesomeIcon>
                                </Col>
                                    </Row>
                                </Form.Group>
                            </div>
                           
                            <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group  className="mb-3 fw-bold" controlId="formBasicPassword">
                                <Form.Label  style={{ margin:'0px 0px 0px  75px' }}>New Password</Form.Label>
                                   <Row>
                                    <Col align='left' sm={8}>
                                    <Form.Control
                                        type={passwordShown['new password'] ? 'text':'password'}
                                        name="password"
                                        placeholder="New Password"
                                        style={{ borderRadius: "20px",margin:'0px 2px 0px  70px' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    </Col>
                                    <Col sm={2}>
                                    <FontAwesomeIcon style={{margin:'0px 0px 0px  10px'}} className='mt-2 fa-lg'  icon={passwordShown['new password'] ? faEye:faEyeSlash} onClick={()=>togglePassword('new password')}></FontAwesomeIcon>
                                    </Col>
                                    </Row>
                                </Form.Group>
                            </div>
                           
                            <div className="justify-content-center row g-3 align-items-center">
                                <Form.Group className="mb-3 fw-bold" controlId="formBasicPassword">
                                <Form.Label style={{ margin:'0px 0px 0px  75px' }}>Re-enter New Password</Form.Label>
                                    <Row>
                                    <Col align='left' sm={8}>
                                    <Form.Control
                                        type={passwordShown['renew password'] ? 'text':'password'}
                                        name="re_password"
                                        placeholder="New Password"
                                        style={{ borderRadius: "20px",margin:'0px 0px 0px  70px' }}
                                        value={re_password}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                    </Col>
                                    <Col sm={1}>
                               
                               
                                    <FontAwesomeIcon style={{margin:'0px 0px 0px  10px'}} className='mt-2 fa-lg' icon={passwordShown['renew password'] ? faEye:faEyeSlash} onClick={()=>togglePassword('renew password')}></FontAwesomeIcon>
                                    </Col>
                                    </Row>
                                    {pwd_err != '' && <p className="error" style={{margin:'0px 0px 0px  130px'}}>{pwd_err}</p>}
                                
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
          </div>
        );
    }
  
}
 
export default UpdatePassword;