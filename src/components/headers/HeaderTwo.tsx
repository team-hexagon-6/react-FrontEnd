import React from 'react'
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../utils/auth";
import { Link } from "react-router-dom";
import "./HeaderTwo.css"


function HeaderTwo() {
    const auth = useAuth();
    const logout=()=>{
        localStorage.clear();
        window.location.href="/login";
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
              {auth.user && (
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
