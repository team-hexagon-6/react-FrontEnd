import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./HomePage.css";
import Image from "../../assets/images/image1.jpg";
import { Button } from "react-bootstrap";
export default function HomePage() {

  const navigate = useNavigate();

  return (
    <div>
      <NavBar site={'About'} />
      <div className="homepage mt-5">

        <div className="container cont footer justify-content-center mt-5">

          <div className="row mt-4" style={{
            padding: "20px",
            borderBottom: "1px solid grey",
          }}>
            <div className="col-lg-4 mt-5">
              <div className="image">
                <img src="https://i.ibb.co/KmH9zws/Parkinson-bro.png" alt="" style={{
                  height: "100%",

                }} />
              </div>
            </div>
            <div className="info_p col-lg-7">
              <h3 className="Header1 mb-0px">Parkinson's Disease Detection System</h3>

              <p className="info mt-0">Parkinson's disease is a neurological ailment that produces unintentional or uncontrolled movements such as shaking, stiffness, and difficulties with balance and coordination. Symptoms normally appear gradually and progress over time.
                As the condition advances, persons may experience trouble walking, talking, and writing aswell.

                By using spiral and wave testing, our Machine Learning System artwork can simply recognize and determine whether or not Parkinson's disease exists.

              </p>
{/* 
              <Button variant="primary" style={{ borderRadius: "20px", margin: "10px" }} onClick={() => {navigate('/about')}}>About</Button>{'    '}
              <Button variant="primary" style={{ borderRadius: "20px", margin: "10px" }} onClick={() => {navigate('/login')}}>Sign In</Button> */}
            </div>
          </div>
        </div>


      </div>

    </div>
  );
}
