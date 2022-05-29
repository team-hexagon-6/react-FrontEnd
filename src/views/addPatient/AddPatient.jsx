import React, { useState, useEffect } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Link } from "react-router-dom";
import ExaminerServices from "../../services/API/ExaminerServices";
import "./AddPatient.css";
import Validation from "../../Validation";
import { Form, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import Messages from "../../helpers/Messages";

function AddPatient() {
  const formValues = {
    "Patient ID":"",
    "First Name": "",
    "Last Name": "",
    NIC: "",
    "Contact Number": "",
    Email: "",
    Birthday: "",
    GenderName: "",
    GenderValue: "",
  };

  const [state, setState] = useState(formValues);
  const [errorData, setErrorData] = useState(formValues);
  const [genderTypes, setgenderTypes] = useState([]);
  const errors = {};
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getGenderTypes();
  }, []);

  const getGenderTypes = async () => {
    setLoader(true);
    try {
      const genderType = await ExaminerServices.getgendertypes();
      console.log(genderType.data.data);
      setgenderTypes(genderType.data.data);
    } catch (err) {
      
    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  const handleValidity = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (event) => {
    console.log("event is", event.split(",")[0]);
    setState({
      ...state,
      GenderName: event.split(",")[0],
      GenderValue: event.split(",")[1],
    });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const { value, error } = Validation.addPatient(state);
    console.log(state);
    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
      console.log(errors);
    } else {
      try {
        console.log(state);
        const response = await ExaminerServices.addPatient(state);
        console.log(response);
        if (response.status === 201) {
          Messages.SuccessMessage("Patient Added Successfully");
          setTimeout(() => {
            setLoader(false);
          }, 200);
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error.message);
        Messages.ErrorMessage({
            error: error,
            main_part: "PATIENT ADDING FAILED",
          });
      }
    }
    setErrorData(errors);
    setTimeout(() => {
      setLoader(false);
    }, 200);
  };

  if (loader) {
    return <Loader />;
  } else {
    return (
      <div>
        <HeaderTwo />
        <div className="mt-3 container border border-1 border-primary d-flex flex-column col-4 justify-content-center ">
          <h3 className="fs-1 text-primary mt-4">Add Patient</h3>
          <div className="form1">
          <div className="justify-content-center row g-3 align-items-center">
              <div className="col-3 text-center">
                <label htmlFor="" className="col-form-label">
                  Patient ID
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="Patient ID"
                  aria-describedby="passwordHelpInline"
                  onChange={handleValidity}
                />
              </div>
            </div>
            {errorData["Patient ID"] !== "" && (
              <p
                className="d-flex justify-content-center"
                style={{ color: "red" }}
              >
                {errorData["Patient ID"]}
              </p>
            )}
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
                  style={{ width: "204px" }}
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
            <div className="flex justify-content-center col-12 row g-3 align-items-center">
              <div className="col-5 text-center">
                <Form.Label
                  className="col-form-label"
                  style={{ margin: " 0px  00px 0px 50px" }}
                >
                  Gender
                </Form.Label>
              </div>
              <div className="col-7">
                <DropdownButton
                  bsPrefix="button1"
                  id="dropdown-basic-button"
                  title={state.GenderName == "" ? "Gender" : state.GenderName}
                  onSelect={handleSelect}
                >
                  {" "}
                  {genderTypes.map((row) => (
                    <Dropdown.Item eventKey={[row.name, row.slug]}>
                      {row.name}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <Row>
                <Col>
                  {errorData["GenderName"] !== "" && (
                    <p
                      className="d-flex justify-content-center"
                      style={{ color: "red" }}
                    >
                      {errorData["GenderName"]}
                    </p>
                  )}
                </Col>
              </Row>
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
}

export default AddPatient;
