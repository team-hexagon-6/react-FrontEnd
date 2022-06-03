import React, { useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import Validation from "../../Validation";
import { useNavigate, useLocation } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye} from  '@fortawesome/free-solid-svg-icons'


import { toast } from "react-toastify";



import Messages from "../../helpers/Messages";
import Loader from "../../components/loader/Loader";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loader, setLoader] = useState(false);
  const [passwordShown,setPasswordShown]=useState(false);
  const togglePassword=()=>{
    setPasswordShown( !(passwordShown));
}

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const { value, error } = Validation.login({
      username,
      password,
    });
    if (error) {
      const errors = {};
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      if (errors.username)
        setUsernameError(errors.username);
      if (errors.password) {
        setPasswordError(errors.password);
        console.log(passwordError);
      }
    } else {
      try {
        const response = await AuthServices.login({ username, password });
        // console.log("response - 2", response);
        if (response.status === 200) {
          // toast.success("Login Successfully", {
          //   position: "top-center",
          //   autoClose: 5000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          // });
          Messages.SuccessMessage("Successfully Logged In.");
          // navigate(redirectPath,{replace:true})
          // const user=jwtDecode(Token.getAccessToken())
          // console.log(user);
          // setAuth({userRole:user.role,profile_complete:user.profile_complete})
          navigate(from, { replace: true })
          

        }
      } catch (error) {
        console.log("error response : ",error.response.data.message);
        // console.log(error.response);
        // toast.error(error.message, {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        console.log(error.response.data.message);
        const errormessage=error.response.data.message;
        Messages.ErrorMessage({
          error: error,
          custom_message:error.response.data.message.user
        });
      }
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader />
  } else {

    return (
      <div className="login">
        <HeaderOne />
        <div className="container  d-flex flex-column col-4 justify-content-center " style={{ border: "1px solid #1376BD", borderLeft: "10px solid #1376BD" }}>
          <div className="image">
            <img src="https://i.ibb.co/f0D5tLF/login.png" alt="" />
          </div>
          <h3 className="fa header">Login</h3>
          <div className="form1">
            <div className="justify-content-center row g-3 align-items-center">
              <div className="col-2">
                <label htmlFor="Username" style={{margin:'0px 0px 0px 50px'}}  className="col-form-label fa fw-bold">
                  Username
                </label>
              </div>
              <div className="col-7">
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: "20px",margin:'0px 20px 0px 50px' }}
                  aria-describedby="passwordHelpInline"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="col-3"></div>
            </div>
            {usernameError && (
              <p
                className="d-flex justify-content-center"
                style={{ color: "red",margin:'0px 20px 0px 50px' }}
              >
                {usernameError}
              </p>
            )}
            <div className="justify-content-center row g-3 align-items-center">
              <div className="col-2">
                <label htmlFor="Password" style={{margin:'0px 0px 0px 50px'}} className="col-form-label fa fw-bold ">
                  Password
                </label>
              </div>
              <div className="col-7">
                <input
                  type={passwordShown ? 'text':'password'}
                  id="inputPassword"
                  className="form-control"
                  style={{ borderRadius: "20px",margin:'0px 0px 0px 50px'}}
                  aria-describedby="passwordHelpInline"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div >
              <div className="col-3">
              <FontAwesomeIcon  style={{margin:'0px 20px 0px 1px'}} className='fa-lg'  icon={passwordShown? faEye:faEyeSlash} onClick={togglePassword}></FontAwesomeIcon>
              </div>
            </div>
            {passwordError && (
              <p
                className="d-flex justify-content-center"
                style={{ color: "red",margin:'0px 20px 0px 50px' }}
              >
                {passwordError}
              </p>
            )}
            <div className="btn-container d-flex justify-content-center ">
              <button
                type="submit"
                className="fa btn btn-primary w-50"
                onClick={handleSubmit}
                style={{ borderRadius: "20px",margin:'0px 20px 0px 40px'}}
              >
                Login
              </button>
              
            </div>
          </div>
          {/* <Link to="" className="d-flex forgetPass justify-content-center">
          Forget Password?
        </Link> */}
        </div>
      </div>
    );
  }
}

export default Login;
