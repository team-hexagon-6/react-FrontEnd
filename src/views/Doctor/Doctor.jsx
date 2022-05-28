import React, { Component } from "react";
// import './doctor.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderOne from "../../components/headers/HeaderOne";
import { Button, ButtonGroup } from "react-bootstrap";
import HeaderTwo from "../../components/headers/HeaderTwo";

const Doctor = () => {
  const [patient_id, setPatientId] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <HeaderTwo />

      <div className="col-sm-4 reg justify-content-center">
        <h1 className="admindash_header">Doctor Dashboard</h1>

        <h6 className="admindash_header">Welcome, username!</h6>

        <div className="image" style={{ marginBottom: "0px" }}>
          <img src="../../public/dashboard.png" alt="" />
        </div>

        {/* <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={patient_id}
                onChange={(event)=>setPatientId(event.target.value)}
                required
              />
               <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={()=>{navigate(`/testDetails/${patient_id}`)}}>Show Patient</button> */}

        {/* <button className='butts' onClick={() => { navigate('/allpatients') }}>View All Patients</button>

        <button className='butts' onClick={() => { navigate('/viewPatient') }}>View Patient</button>

        <button className='buttz' id='update' onClick={() => { }}>Update Account</button> */}

        <ButtonGroup vertical className="d-flex">
          <Button
            className="dash_btn"
            style={{
              borderRadius: "20px",
              margin: "20px",
              width: "100%",
              marginLeft: "auto",
            }}
            onClick={() => {
              navigate("/allpatients");
            }}
          >
            View All Paatients
          </Button>
          <Button
            className="dash_btn"
            style={{
              borderRadius: "20px",
              margin: "20px",
              width: "100%",
              marginLeft: "auto",
            }}
            onClick={() => {
              navigate("/viewPatient");
            }}
          >
            View Patient
          </Button>
          <Button
            className="dash_btn"
            style={{
              borderRadius: "20px",
              margin: "20px",
              width: "100%",
              marginLeft: "auto",
            }}
            onClick={() => {
              navigate("/updateProfile");
            }}
          >
            Update Account
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Doctor;
