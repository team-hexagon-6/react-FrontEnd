import React, { useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Link } from "react-router-dom";
import ExaminerServices from "../../services/API/ExaminerServices";
import "./AddPatient.css";
import Validation from "../../Validation";
import { Form, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

function AddPatient() {
  const formValues = {
    "First Name": "",
    "Last Name": "",
    NIC: "",
    "Contact Number": "",
    Email: "",
    Birthday: "",
    Gender: "",
    PatientID: "P12345679",
  };
  const [state, setState] = useState(formValues);
  const [errorData, setErrorData] = useState(formValues);

  const errors = {};
  const handleValidity = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (event) => {
    console.log("event is", event);
    setState({
      ...state,
      Gender: event,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value, error } = Validation.addPatient(state);
    // console.log(state);
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
    } else {
      try {
        const response = await ExaminerServices.addPatient(state);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    setErrorData(errors);
  };

  return (
    <div>
      <HeaderOne />
      <div className="container border border-1 border-primary d-flex flex-column col-4 justify-content-center ">
        <h3 className="header">Add Patient</h3>
        <div className="form1">
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
                type="date"
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
          {/* <div className="flex justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <label htmlFor="" className="col-form-label">
                Gender
              </label>
            </div>
            <div className="col-5">
              <select className="w-100" onSelect={handleSelect}>
                <option value="select"> Select</option>
                <option value="Male"> Male </option>
                <option value="Female"> Female </option>
              </select>
            </div>
          </div>
          {errorData["Gender"] !== "" && (
            <p
              className="d-flex justify-content-center"
              style={{ color: "red" }}
            >
              {errorData["Gender"]}
            </p>
          )} */}
          <div className="flex justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center"></div>
            <Form.Group
              as={Row}
              className="fw-bold col-xl-12 mb-3 mx-auto"
              controlId="Gender"
            >
              <Form.Label className="fa" column sm={4}>
                Gender
              </Form.Label>
              <Col sm={1}>
                <DropdownButton
                  bsPrefix="button1"
                  id="dropdown-basic-button"
                  title={state.Gender == "" ? "Gender" : state.Gender}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                  <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Row>
                <Col></Col>
                <Col sm={8}>
                  {errorData["Gender"] !== "" && (
                    <p className="error">{errorData["Gender"]}</p>
                  )}
                </Col>
              </Row>
            </Form.Group>
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
      </div>
    </div>
  );
}

export default AddPatient;
