import React from "react";
import SchemeDesc from "./SchemeDesc";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";

import "../../static/styles/studentApp.css"


function StudentApp() {
  return (
    <>
      <h1>Scholarships Provided: </h1>
      <SchemeDesc />
      
      <div className="login-btns">
        <Link to="/student/login" className="loginButton">
          <Button variant="contained">
            LogIN
            <i className="fa-solid fa-graduation-cap"></i>
          </Button>
        </Link>
        <p>Click here to <strong>LOGIN</strong> or for <strong>FRESH REGISTRATION</strong>!</p>
      </div>
    </>
  );
}

export default StudentApp;