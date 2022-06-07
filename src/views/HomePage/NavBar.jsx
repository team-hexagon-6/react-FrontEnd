import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Token from "../../services/Token";
import jwtDecode from "jwt-decode";

function NavBar({ site }) {
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

              {site == 'About' ? <Nav.Link as={Link} to="/about" className="navlink" style={{ borderRadius: "30px", textDecoration: "none", color: "#1376BD" }}>About</Nav.Link> : <Nav.Link as={Link} className="navlink" to="/" style={{ borderRadius: "30px", textDecoration: "none", color: "#1376BD" }}>Home </Nav.Link>
              }


              {!user && (
                <Nav.Link as={Link} to="/login" className="navlink" style={{ borderRadius: "30px", textDecoration: "none", color: "#1376BD" }}>Login</Nav.Link>
              )}
              {user && (
                <Nav.Link as={Link} to="/dashboard" className="navlink" style={{ borderRadius: "30px", textDecoration: "none", color: "#1376BD" }}>Dashboard</Nav.Link>
              )}
              {user && (
                <Nav.Link as={Link} to="/logout" className="navlink" style={{ borderRadius: "30px", textDecoration: "none", color: "#1376BD" }}>Logout</Nav.Link>
              )}
            </Nav>
          </Container>
        </div>
      </Navbar>
    </div>
  );
}

export default NavBar;
