import React, { Component } from 'react';
import './Examiner.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderOne from '../../components/headers/HeaderOne';


const Examiner =()=>{
  let navigate=useNavigate();
  const [patient_id, setPatientId] = useState('');

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
         <HeaderOne />
        <div className='optionss'>
            <button className='butts'  onClick={()=>{ navigate("/addPatient")}}>Add Patient</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butts' onClick={()=>{ navigate('/allpatients')}}>View All Patients</button>
            <br></br>
            <br></br>
            <br></br>
            {/* <button className='butts' onClick={()=>{ navigate('/viewPatient')}}>View Patient</button> */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="passwordHelpInline"
                value={patient_id}
                onChange={(event)=>setPatientId(event.target.value)}
                required
              />
               <button className="btn btn-outline-secondary" type="button" id="button-addon2"  onClick={()=>{navigate(`/testDetails/${patient_id}`)}}>Search Patient</button>

            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button className='butts' id='update' onClick={()=>{}}>Update Account</button>
        </div>

        
    </div>
  )
}


export default Examiner;