import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "font-awesome/css/font-awesome.css";
import HeaderOne from "../../components/headers/HeaderOne";
import ExaminerServices from "../../services/API/ExaminerServices";
import Validation from "../../Validation";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";

function UpdatePatientProfile() {
  const params = useParams();
  const navigate = useNavigate();
  // const patientID = "P233344335";
  const formValues = {
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
  const [errorData, setError] = useState(formValues);
  const [genderTypes, setgenderTypes] = useState([]);

  const getGenderTypes = async () => {
    try {
      const genderType = await ExaminerServices.getgendertypes();
      console.log(genderType.data.data);
      setgenderTypes(genderType.data.data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getGenderTypes();
  }, []);

  const handleUser = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
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
  const errors = {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { value, error } = Validation.updatePatientProfile(state);

    if (error) {
      error.details.map((item) => {
        errors[item.path[0]] = item.message;
      });
    } else {
      try {
        // const patient_id = params.patient_id;
        console.log("State:", state);
        const response = await ExaminerServices.updatePatientProfile(state);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    setError(errors);
  };

  return (
    <div>
      <HeaderTwo />
      <div className="form-container col-xl-5 mt-2 pt-5 mx-auto ">
        <h1 className="fs-1 text-primary mb-5">Update Profile</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="First Name"
          >
            <Form.Label column sm={4}>
              First Name
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                type="text"
                name="First Name"
                onChange={handleUser}
              />
              {errorData["First Name"] !== "" && (
                <p className="error">{errorData["First Name"]}</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="Last Name"
          >
            <Form.Label column sm={4}>
              Last Name{" "}
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                type="text"
                name="Last Name"
                onChange={handleUser}
              />
              {errorData["Last Name"] !== "" && (
                <p className="error">{errorData["Last Name"]}</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="NIC"
          >
            <Form.Label column sm={4}>
              NIC
            </Form.Label>
            <Col sm={6}>
              <Form.Control type="text" name="NIC" onChange={handleUser} />
              {errorData.NIC !== "" && <p className="error">{errorData.NIC}</p>}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="Contact Number"
          >
            <Form.Label column sm={4}>
              Contact Number
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                type="text"
                name="Contact Number"
                onChange={handleUser}
              />
              {errorData["Contact Number"] !== "" && (
                <p className="error">{errorData["Contact Number"]}</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="Email"
          >
            <Form.Label column sm={4}>
              Email
            </Form.Label>
            <Col sm={6}>
              <Form.Control type="text" name="Email" onChange={handleUser} />
              {errorData.Email !== "" && (
                <p className="error">{errorData.Email}</p>
              )}
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="fa fw-bold col-xl-12 mb-2 mx-auto"
            controlId="Birthday"
          >
            <Form.Label column sm={4}>
              Birthday
            </Form.Label>
            <Col sm={6}>
              <Form.Control type="date" name="Birthday" onChange={handleUser} />
              {errorData.Birthday !== "" && (
                <p className="error">{errorData.Birthday}</p>
              )}
            </Col>
          </Form.Group>

          <div className="flex justify-content-center row g-3 align-items-center">
            <div className="col-3 text-center">
              <Form.Label
                className="col-form-label"
                style={{ margin: " 0px  20px" }}
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
          <Button
            className="btn btn-primary button"
            size="lg"
            block="block"
            type="submit"
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePatientProfile;
