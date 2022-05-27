import React, { useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import Validation from "../../Validation";
import { useNavigate,useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuth } from "../../utils/auth";

import Messages from "../../helpers/Messages";

function Login() {
  const auth=useAuth();
  const navigate =useNavigate();
  const location =useLocation();

  const redirectPath = location.state?.path || '/'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
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
        setUsernameError(errors.username.replace('"username"', "Username"));
      if (errors.password) {
        setPasswordError("Password you entered does not match");
        console.log(passwordError);
      }
    } else {
      try {
        const response = await AuthServices.login({ username, password });
        console.log("response - 2", response);
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

          auth.login(username);
          // navigate(redirectPath,{replace:true})
          navigate('/dashboard');

        }
      } catch (error) {
        // console.log("error response : ",error.response.data.message);
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
        Messages.ErrorMessage({
          error :error,
          main_part: "LOGIN FAILED",
        });
      }
    }
  };

  return (
    <div className="login">
      <HeaderOne />
      <div className="container  d-flex flex-column col-4 justify-content-center " style={{border: "1px solid #1376BD", borderLeft: "10px solid #1376BD"}}>
      <div className="image">
                <img src="../../public/login.png" alt=""/>
            </div>
        <h3 className="header">Login</h3>
        <div className="form1">
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="Username" className="col-form-label">
                Username
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                style={{borderRadius: "20px"}}
                aria-describedby="passwordHelpInline"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>
          {usernameError && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {usernameError}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="Password" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col-auto">
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                style={{borderRadius: "20px"}}
                aria-describedby="passwordHelpInline"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          {passwordError && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {passwordError}
            </p>
          )}
          <div className="btn-container d-flex justify-content-center ">
            <button
              type="submit"
              className="btn btn-primary w-50"
              onClick={handleSubmit}
              style={{borderRadius: "20px"}}
            >
              Submit
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

export default Login;
