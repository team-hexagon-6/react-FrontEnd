import React, { Component } from "react";
// import './doctor.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderTwo from '../../components/headers/HeaderTwo';
import { Button, ButtonGroup } from 'react-bootstrap';
import UserServices from '../../services/API/UserServices';
import Loader from '../../components/loader/Loader';

const Doctor = () => {
  const [patient_id, setPatientId] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState([])

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUser();
  }, [])

  const getUser = async () => {
    setLoader(true);
    try {
      const getuser = await UserServices.getUser();
      setUser(getuser.data.data);

    }
    catch (err) {
      // console.log(err);

    }
    setTimeout(() => {
      setLoader(false);
    }, 200);
  }

  if (loader) {
    return <Loader />
  } else {

    return (
      <div>

        <HeaderTwo/>

        <div className='col-sm-4 reg justify-content-center'>

          <h1 className="admindash_header">Doctor Dashboard</h1>

          <h6 className="admindash_header">Welcome, {user.firstname && user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)}!</h6>

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
              style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
              onClick={() => { navigate('/patients') }}>
              View All Patients
            </Button>
            {/* <Button
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
          </Button> */}
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
              <Button className="" style={{ borderRadius: "0 20px 20px 0" }} onClick={() => {patient_id? navigate(`/test-details/${patient_id}`):  window.alert(`Please insert patient id`) }}>Search Patient</Button>   
      

            </div>
            <Button
              className="dash_btn"
              style={{ borderRadius: "20px", margin: "20px", width: "100%", marginLeft: "auto" }}
              onClick={() => { navigate('/update-profile') }}>
              Update Account
            </Button>
          </ButtonGroup>

        </div>

      </div>
    )
  }
}


export default Doctor;
