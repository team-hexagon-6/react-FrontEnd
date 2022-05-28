import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../utils/auth";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const auth = useAuth();
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
              {!auth.user && (
                <NavLink className="navlink" to="/login">
                  <Link to="/login">Login </Link>
                </NavLink>
              )}
              {auth.user && (
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
