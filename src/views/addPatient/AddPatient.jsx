import React, { useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Link } from "react-router-dom";
import AuthServices from "../../services/AuthServices";
import "./AddPatient.css";
import Validation from "../../Validation";

function AddPatient() {
  const formValues = {
    "First Name": "",
    "Last Name": "",
    NIC: "",
    "Contact Number": "",
    Email: "",
    Birthday: "",
  };
  const [state, setState] = useState(formValues);
  const [errorData, setErrorData] = useState(formValues);
  const [gender, setGender] = useState("Select gender");
  const [genderError, setGenderError] = useState("");
  console.log("Gender is ", gender);
  console.log("Gender Error is ", genderError);
  const errors = {};
  const handleValidity = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, error } = Validation.addPatient(state);
    console.log(state);
    if (gender !== "Male" || gender !== "Female") {
      setGenderError("Select Gender");
    }
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
    }
    setErrorData(errors);
  };

  return (
    <div>
      <HeaderOne />
      <div className="container border border-1 border-primary d-flex flex-column col-4 justify-content-center ">
        <h3 className="header">Add Patient</h3>
        <div className="form">
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                First Name
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                name="First Name"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["First Name"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["First Name"]}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Last Name
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="Last Name"
                className="form-control"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["Last Name"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["Last Name"]}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center ">
              <label htmlFor="" className="col-form-label">
                NIC
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="NIC"
                className="form-control"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["NIC"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["NIC"]}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Contact Number
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="Contact Number"
                className="form-control"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["Contact Number"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["Contact Number"]}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Email
              </label>
            </div>
            <div className="col-auto">
              <input
                type="Email"
                name="Email"
                className="form-control"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["Email"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["Email"]}
            </p>
          )}
          <div className="justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Birthday
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="Birthday"
                className="form-control"
                aria-describedby="passwordHelpInline"
                onChange={handleValidity}
              />
            </div>
          </div>
          {errorData["Birthday"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["Birthday"]}
            </p>
          )}
          <div className="flex justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Gender
              </label>
            </div>
            <div className="col-5">
              <select
                className="w-100"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="select"> Select</option>
                <option value="Male"> Male </option>
                <option value="Female"> Female </option>
              </select>
            </div>
          </div>
          {genderError && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              Select gender
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
      </div>
    </div>
  );
}

export default AddPatient;
