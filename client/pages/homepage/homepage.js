import Topnav from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import SVG from "./item.js";
import Features from '../../components/features.js';
import Button from 'react-bootstrap/Button';
import React from 'react';

function Homepage() {
    return (
      <div className="Home">
        <Topnav />
        <header className="Home-header">
        
          <h1 className="Splash-header">Host Your Favorite<br></br><SVG /><br></br>collection for Free</h1>
          <div className = "sign-buttons">
          <Button variant="primary" size="md" className = "sign-up">
          Sign Up
        </Button>
        <Button variant="outline-warning" size="md" className = "log-in">
          Log In
        </Button>
          </div>
          
          <h2>Why Choose Us?</h2>
          <Features /> 
        </header>
        
        <Footer />
      </div>
    );
  }

  export default Homepage;