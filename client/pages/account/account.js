import Topnav from "../../components/navbar.js";
import Footer from "../../components/footer.js";
import Features from "../../components/features.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import "./form.scss";
import { useNavigate } from 'react-router-dom';

const initialState = undefined;

function Account() {
  const [createAccount, setCreateAccount] = useState(initialState);
  const [logIn, setLogIn] = useState(initialState);
  const [firstName, setFirstName] = useState(initialState);
  const [lastName, setLastName] = useState(initialState);
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [signedUp, setSignedUp] = useState(initialState);
  const [cookie, setHasCookie] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    console.log("loaded");

    fetch("http://localhost:3000/account", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHasCookie(data);
        navigate('/dashboard');
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  const accountCreate = () => {
    setCreateAccount(true);
  };

  const logInCreate = () => {
    setLogIn(true);
  }

  const handleChange = (event) => {
    if (event.target.name === "firstName") {
      setFirstName(event.target.value);
    }
    if (event.target.name === "lastName") {
      setLastName(event.target.value);
    }
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    const typeSubmit = e.target.id;

    if(typeSubmit === 'sign'){
      const postSignUp = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
  
      fetch("http://localhost:3000/account", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postSignUp),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //setSignedUp(data);
          navigate('/dashboard');
        }).catch((error) => {
          console.log(error)
        });
    } else {
      const postLogIn = {
        email: email,
        password: password,
      };
      //console.log('test')
      fetch("http://localhost:3000/account/log", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(postLogIn),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          //setSignedUp(data);
          navigate('/dashboard');
        }).catch((error) => {
          console.log(error)
        });
    }
    
  };
  //{signedUp.firstName}
 

  // Render module if user selects to create an account
  const createAccountContainer = () => (
    <div className="Home-header">
      <div className="form">
        <div className="tab-content">
          <div id="signup">
            <h1>Sign Up for Free</h1>

            <div className="top-row">
              <div className="field-wrap">
                <label for="firstName">
                  First Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                />
              </div>
              <div className="field-wrap">
                <label for="lastName">
                  Last Name<span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                />
              </div>
            </div>
            <div className="field-wrap">
              <label for="email">
                Email Address<span className="req">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="field-wrap">
              <label for="password">
                Set A Password<span className="req">*</span>
              </label>
              <input
                type="password"
                required
                autoComplete="off"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
            </div>
            <button onClick={handleSubmit} className="button button-block" id="sign">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const loginContainer = () => (
    <div className="Home-header">
      <div className="form">
        <div className="tab-content">
          <div id="signup">
            <h1>Log In</h1>

            <div className="top-row"></div>
            <div className="field-wrap">
              <label for="email">
                Email Address<span className="req">*</span>
              </label>
              <input
                type="email"
                required
                autoComplete="off"
                id="email"
                name="email"
                onChange={handleChange}
                value={email}
              />
            </div>
            <div className="field-wrap">
              <label for="password">
                Password<span className="req">*</span>
              </label>
              <input
                type="password"
                required
                autoComplete="off"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
              />
            </div>
            <button onClick={handleSubmit} className="button button-block" id="log">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  //default page behavior
  const defaultHeader = () => (
    <div className="Home-header">
      <h1 className="Account-header">Log In or Sign Up</h1>
      <div className="sign-buttons">
        <Button variant="primary" size="md" className="sign-up1" onClick={logInCreate}>
          I Have an Account
        </Button>
        <Button
          onClick={accountCreate}
          variant="info"
          size="md"
          className="log-in1"
        >
          Create an Account
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="Home">
      <Topnav />

      {!createAccount && !logIn && !signedUp && defaultHeader()}
      {createAccount && createAccountContainer()}
      {logIn && loginContainer()}
      <Footer />
    </div>
  );
}

export default Account;

/*
  {!createAccount && !signedUp && defaultHeader()}
      {createAccount && !signedUp && createAccountContainer()}
      {signedUp && loggedInheader()}
*/
