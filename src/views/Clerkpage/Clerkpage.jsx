import React, { Component } from 'react';
import './clerk.css'

const Clerkpage =()=>{

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
        <div className='optionss'>
            <button className='butts'  onClick={()=>{}}>Add Patient</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butts' onClick={()=>{}}>View All Patients</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butts' onClick={()=>{}}>View Patient</button>
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


export default Clerkpage;