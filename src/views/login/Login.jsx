import React, { useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";

import {toast} from 'react-toastify';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (error) {
    } else {
      try {
        const response = await AuthServices.login({ username, password });
        console.log("response - 2",response);
        if(response.status===200){
          toast.success('Login Successfully', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
      }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
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
  };

  return (
    <div className="login">
      <HeaderOne />
      <div className="container border border-1 border-primary d-flex flex-column col-4 justify-content-center ">
        <h3 className="header">Login</h3>
        <div className="form">
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-auto">
              <label for="Username" className="col-form-label">
                Username
              </label>
            </div>
            <div class="col-auto">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-auto">
              <label for="Password" class="col-form-label">
                Password
              </label>
            </div>
            <div className="col-auto">
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="btn-container d-flex justify-content-center ">
            <button
              type="submit"
              className="btn btn-primary w-50"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <Link to="" className="d-flex forgetPass justify-content-center">
          Forget Password?
        </Link>
      </div>
    </div>
  );
}

export default Login;
