import React, { Component } from 'react'
import './doctor.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 

const Doctor =()=> {
  const [patient_id, setPatientId] = useState('');
  let navigate=useNavigate();

    return (
      <div>
          <div className='options'>
          
              {/* <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={patient_id}
                onChange={(event)=>setPatientId(event.target.value)}
                required
              />
               <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={()=>{navigate(`/testDetails/${patient_id}`)}}>Show Patient</button> */}
               
      
           
            <button className='butts' onClick={()=>{ navigate('/allpatients')}}>View All Patients</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butts' onClick={()=>{ navigate('/viewPatient')}}>View Patient</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
           
        

        


          
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className='buttz' id='update' onClick={()=>{}}>Update Account</button>
                </div>
      </div>
    )
  }


export default Doctor;