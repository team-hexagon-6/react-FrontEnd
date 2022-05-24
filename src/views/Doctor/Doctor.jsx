import React, { Component } from 'react'
import './doctor.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 

const Doctor =()=> {
  const [patient_id, setPatientId] = useState('');

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
              />
               <button className="btn btn-outline-secondary" type="button" id="button-addon2">Show Patient</button>

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


export default Doctor;