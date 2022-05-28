import React, { Component } from "react";
import "./Examiner.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderOne from "../../components/headers/HeaderOne";
import { Button, ButtonGroup } from "react-bootstrap";
import HeaderTwo from '../../components/headers/HeaderTwo';

const Examiner = () => {
  let navigate = useNavigate();
  const [patient_id, setPatientId] = useState("");

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //     try {
  //       const response = await DoctorServices.fetch_All_Patient();
  //       // console.log("response - 2",response);

  //     //   if(response.status===200){
  //     //     toast.success('Login Successfully', {
  //     //         position: "top-center",
  //     //         autoClose: 5000,
  //     //         hideProgressBar: false,
  //     //         closeOnClick: true,
  //     //         pauseOnHover: true,
  //     //         draggable: true,
  //     //         progress: undefined,
  //     //         });
  //     // }

  //     } catch (error) {

  //       console.log(error.message);

  //       // toast.error(error.message, {
  //       //   position: "top-center",
  //       //   autoClose: 5000,
  //       //   hideProgressBar: false,
  //       //   closeOnClick: true,
  //       //   pauseOnHover: true,
  //       //   draggable: true,
  //       //   progress: undefined,
  //       //   });

  //     }

  // };

  return (
    <div>
      <HeaderTwo />

      <div className="col-sm-4 reg optionss justify-content-center">
        <h1 className="admindash_header">Examiner Dashboard</h1>
        {/* <h6 className="admindash_header">Welcome, {user.firstname && user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!</h6> */}
        <h6 className="admindash_header">Welcome, username!</h6>

        <div className="image" style={{ marginBottom: "0px" }}>
          <img src="../../public/dashboard.png" alt="" />
        </div>

        <ButtonGroup vertical className="d-flex">
          <Button
            className=""
            style={{
              borderRadius: "20px",
              margin: "20px",
              width: "100%",
              marginLeft: "auto",
            }}
            onClick={() => {
              navigate("/addPatient");
            }}
          >
            Add Patient
          </Button>
          <Button
            className=""
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
            View All Patients
          </Button>
        </ButtonGroup>

        {/* <button className='butts' onClick={() => { navigate("/addPatient") }}>Add Patient</button>
        <br></br>
        <br></br>
        <br></br> */}
        {/* <button className='butts' onClick={() => { navigate('/allpatients') }}>View All Patients</button>
        <br></br>
        <br></br> */}
        <br></br>
        {/* <button className='butts' onClick={()=>{ navigate('/viewPatient')}}>View Patient</button> */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            style={{ borderRadius: "20px 0 0 20px" }}
            aria-describedby="passwordHelpInline"
            value={patient_id}
            onChange={(event) => setPatientId(event.target.value)}
            required
          />
          <Button
            className=""
            style={{ borderRadius: "0 20px 20px 0" }}
            onClick={() => {
              navigate(`/testDetails/${patient_id}`);
            }}
          >
            Search Patient
          </Button>
        </div>
        {/* <Button className='butts' id='update' onClick={() => { }}>Update Account</Button> */}
        <ButtonGroup vertical className="d-flex">
          <Button
            className=""
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

export default Examiner;
