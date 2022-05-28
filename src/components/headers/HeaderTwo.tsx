import React from 'react'
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./HeaderTwo.css"
import Token from '../../services/Token'
import jwtDecode from "jwt-decode";



function HeaderTwo() {
    const logout=()=>{
        localStorage.clear();
        window.location.href="/login";
    }
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
              <NavLink className="navlink">
                <Link to="/">Home </Link>
              </NavLink>
              {user && (
                <NavLink className="navlink">
                    <Link to='' onClick={logout}>Logout</Link>
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
