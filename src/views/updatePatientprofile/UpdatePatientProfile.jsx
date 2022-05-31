import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "font-awesome/css/font-awesome.css";
import HeaderOne from "../../components/headers/HeaderOne";
import ExaminerServices from "../../services/API/ExaminerServices";
import Validation from "../../Validation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";
import "./Updateprofile.css"
import moment from 'moment';


function UpdatePatientProfile() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const patient_id = location.state.patient_id;
  console.log("Patient ID  ", patient_id);
  // const patientID = "P233344335";
  const formValues = {
    patient_id: patient_id,
    "First Name": "",
    "Last Name": "",
    NIC: "",
    "Contact Number": "",
    Email: "",
    Birthday: "",
    GenderName: "",
    GenderValue: "",
  };

  var [state, setState] = useState(formValues);
  const [errorData, setError] = useState(formValues);
  const [genderTypes, setgenderTypes] = useState([]);

  const getGenderTypes = async () => {
    try {
     
      
    } catch (err) {
      // console.log(err);
    }
  };
  const getPatientDetails = async () => {
    try {
      const genderType = await ExaminerServices.getgendertypes();
      console.log(genderType.data.data);
      setgenderTypes(genderType.data.data);

      const getPatient = await ExaminerServices.getpatientdetails(patient_id);
      console.log("patient",getPatient);
      state = {
        patient_id:patient_id,
        "First Name": getPatient.data.data.firstname,
        "Last Name": getPatient.data.data.lastname,
        NIC: getPatient.data.data.nic,
        "Contact Number": getPatient.data.data.contact_no,
        Email: getPatient.data.data.email,
      Birthday: getPatient.data.data.birthday.split("T")[0],
        GenderValue: getPatient.data.data.gender_type_id===1?genderType.data.data[0]?.slug: genderType.data.data[1]?.slug,
        GenderName:getPatient.data.data.gender_type_id===1?genderType.data.data[0]?.name:genderType.data.data[0]?.name,
      };
      setState(state);
      console.log("state",state);
      
    } catch (error) {}
  };

  useEffect(() => {
    getPatientDetails();
    
  }, []);

  const handleUser = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    // console.log("Current state", state);
    // console.log(moment(state['Birthday']).format("MM-DD-YYYY"))
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
  
    state={...state, 'Birthday': moment(state['Birthday']).format("MM-DD-YYYY") }
    console.log("submit",state);
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
        if (response.status === 200) {            
          Messages.SuccessMessage("Patient Updated Successfully");
      }
      } catch (error) {
        console.log(error.message);
        Messages.ErrorMessage({
          error: error,
          custom_message: `Patient update failed`,
        });
      }
    }
    setError(errors);
  };

  return (
    <div>
  
      <HeaderTwo />
      <div className="form-container col-xl-5 mt-5 pt-5 mx-auto ">
        <h1 className="fs-1 text-primary mb-5">Update Patient</h1>
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
                value={state["First Name"]}
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
                value={state["Last Name"]}
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
              <Form.Control
                type="text"
                name="NIC"
                value={state["NIC"]}
                onChange={handleUser}
              />
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
                value={state["Contact Number"]}
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
              <Form.Control
                type="text"
                name="Email"
                value={state["Email"]}
                onChange={handleUser}
              />
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
              <Form.Control
                type="date"
                name="Birthday"
                value={state["Birthday"]}
                onChange={handleUser}
              />
              {errorData.Birthday !== "" && (
                <p className="error">{errorData.Birthday}</p>
              )}
            </Col>
          </Form.Group>

          <div className="flex justify-content-center fw-bold col-12 row g-3 align-items-center">
            <div className="col-1 text-center">
              <Form.Label
                className="col-form-label"
                style={{ margin: " 0px  0px 0px 50px" }}
              >
                Gender
              </Form.Label>
            </div>
            <div className="col-10">
              <DropdownButton
                bsPrefix="button1"
                id="dropdown-basic-button"
                title={state.GenderName == "" ? "Gender" : state.GenderName}
                onSelect={handleSelect}
                style={{ margin: " 0px  110px 0px 0px" }}
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
            className="btn btn-primary button w-50"
            size="lg"
            block="block"
            type="submit"
            style={{}}
          >
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdatePatientProfile;
