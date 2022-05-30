import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Token from "../../services/Token";
import jwtDecode from "jwt-decode";

function NavBar({site}) {
  try {
    var user = jwtDecode(Token.getAccessToken());
  } catch (err) {
    user = null;
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
              <NavLink className="navlink" to="/about" style={{borderRadius: "30px"}}>
                {site=='About'?<Link to="/about" style={{textDecoration: "none", color: "#1376BD"}}>About </Link>:<Link to="/" style={{textDecoration: "none", color: "#1376BD"}}>Home </Link>}
                
              </NavLink>
              {!user && (
                <NavLink className="navlink" to="/login" style={{borderRadius: "30px"}}>
                  <Link to="/login" style={{textDecoration: "none", color: "#1376BD"}}>Login </Link>
                </NavLink>
              )}
              {user && (
                <NavLink className="navlink" to="/login" style={{borderRadius: "30px"}}>
                  <Link to="/dashboard" style={{textDecoration: "none", color: "#1376BD"}}>Dashboard </Link>
                </NavLink>
              )}
              {user && (
                <NavLink className="navlink" to="/logout" style={{borderRadius: "30px"}}>
                  <Link to="/logout" style={{textDecoration: "none", color: "#1376BD"}}>Logout </Link>
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
