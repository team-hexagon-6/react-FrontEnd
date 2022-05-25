import React, { Component } from 'react'
import './view_patient.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 

const ViewPatient =()=> {
  const [patient_id, setPatientId] = useState('');
  let navigate=useNavigate();

    return (
      <div>
          <div className='options'>
          <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={patient_id}
                onChange={(event)=>setPatientId(event.target.value)}
                required
              />
               <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={()=>{navigate(`/testDetails/${patient_id}`)}}>Show Patient</button>

            </div>
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


export default ViewPatient ;