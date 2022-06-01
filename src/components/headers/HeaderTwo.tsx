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
              <NavLink className="navlink" style={{borderRadius: "30px"}}>
                <Link to="/" style={{textDecoration: "none", color: "#1376BD"}}>Home </Link>
              </NavLink>
              <NavLink className="navlink" style={{borderRadius: "30px"}}>
                <Link to="/dashboard" style={{textDecoration: "none", color: "#1376BD"}}>Dashboard </Link>
              </NavLink>
              {user && (
                <NavLink className="navlink" style={{borderRadius: "30px"}}>
                    <Link to='/logout' style={{textDecoration: "none", color: "#1376BD"}}>Logout</Link>
              </NavLink>
              )}
            </Nav>
          </Container>
        </div>
      </Navbar>
    </div>
  )
}

export default HeaderTwo
