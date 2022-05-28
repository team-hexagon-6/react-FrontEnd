import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Token from '../../services/Token'
import jwtDecode from "jwt-decode";

function NavBar() {
  try{
    var user=jwtDecode(Token.getAccessToken())
   }
   catch(err){
     user=null
   }
  return (
    <div className="Navigation">
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
              <NavLink className="navlink" to="/about">
                <Link to="/about">About </Link>
              </NavLink>
              {!user && (
                <NavLink className="navlink" to="/login">
                  <Link to="/login">Login </Link>
                </NavLink>
              )}
              {user && (
                <NavLink className="navlink" to="/login">
                  <Link to="/dashboard">Dashboard </Link>
                </NavLink>
              )}
            </Nav>
          </Container>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
