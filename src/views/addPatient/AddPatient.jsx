import React from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";

function AddPatient() {
  const [id, setID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNIC] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [birthday, setBirthday] = useState("");

  return (
    <div>
      <HeaderOne />
      <div className="container border border-1 border-primary d-flex flex-column col-4 justify-content-center ">
        <h3 className="header">Add Patient</h3>
        <div className="form">
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="" className="col-form-label">
                First Name
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
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
              <label htmlFor="" className="col-form-label">
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

export default AddPatient;
