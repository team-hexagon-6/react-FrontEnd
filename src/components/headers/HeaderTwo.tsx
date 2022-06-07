import React from 'react'
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./HeaderTwo.css"
import Token from '../../services/Token'
import jwtDecode from "jwt-decode";


function HeaderTwo() {
    // const logout=()=>{
    //     localStorage.clear();
    //     window.location.href="/login";
    // }
   
    try{
      var user=jwtDecode(Token.getAccessToken())
     }
     catch(err){
       user=null
     }

  return (
    <div className='headerTwo'>
      <Navbar className="NAV" bg="light">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="contents">
          <Container>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/"  className="navlink" style={{borderRadius: "30px",textDecoration: "none"}}>Home </Nav.Link>
              <Nav.Link as={Link} to="/dashboard" className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}> Dashboard </Nav.Link>
              {user && (
              <Nav.Link as={Link} to='/logout' className="navlink" style={{borderRadius: "30px",textDecoration: "none", color: "#1376BD"}}>Logout</Nav.Link>
              )}
            </Nav>
          </Container>
        </div>
      </Navbar>
    </div>
  )
}

export default HeaderTwo
