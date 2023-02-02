import Topnav from '../../components/navbar.js';
import Footer from '../../components/footer.js';
import SVG from "./item.js";
import Features from '../../components/features.js';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function Homepage() {
  const navigate = useNavigate();

    return (
      
      <div className="Home">
        <Helmet>
        <title>SVG App - Upload and Store SVGs for Free</title>
        <meta name="description" content="You can upload and store SVGs for free using this app" />
        
      </Helmet>
        <Topnav />
        <header className="Home-header">
        
          <h1 className="Splash-header">Host Your Favorite<br></br><SVG /><br></br>collection for Free</h1>
          <div className = "sign-buttons">
          <Button variant="primary" size="md" className = "sign-up" onClick={() => navigate("/account")}>
          Sign Up
        </Button>
        <Button variant="outline-warning" size="md" className = "log-in" onClick={() => navigate("/account")}>
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