import './App.css';
import Homepage from '../pages/homepage/homepage.js';
import Account from '../pages/account/account.js';
import Dashboard from '../pages/account/dashboard.js';
import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <Homepage />
  )
  }

  function Dash() {
    return (
      <Dashboard />
    )
    }

  function Accounts() {
    return (
      <Account />
    )
    }

function App() {
  return (
    
    <div >
    <Routes>
      <Route  path='/' element={<Home />} />
    </Routes>
    <Routes>
      <Route  path='/account' element={<Accounts />} />
    </Routes>
    <Routes>
      <Route  path='/dashboard' element={<Dash />} />
    </Routes>
  </div>
  );
}

export default App;
