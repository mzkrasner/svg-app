import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { Link } from  "react-router-dom";

function Topnav() {
  return (
    
      <Navbar bg="dark" variant="dark" >
        <Container>
        <Link className="fs-1" to="/">SVG App</Link>
          <Nav className="mr-auto p-3">
            <Link className="fs-4" to="/account">Account</Link>
            <Link className="fs-4" to="/account">Features</Link>
            <Link className="fs-4" to="/account">About Us</Link>
          </Nav>
        </Container>
      </Navbar>
    
  );
}

export default Topnav;