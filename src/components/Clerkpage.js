import React from 'react'

import './clerk.css'

function Clerkpage() {
  return (
    <div>

        <div class="navbar">
        <a href="#">Home</a>
        <a href="#contact">Log Out</a>

      </div>
        <div className='option'>
            <button className='butt'>Add Patient</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt'>View Patient Details</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt'>Do Test For Patient</button>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt'>View Test Result</button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button className='butt' id='update'>Update Account</button>
        </div>

        

    </div>
  )
}

export default Clerkpage