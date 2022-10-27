import React from "react";
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import login from "../../static/img/login.svg";
import { Link } from "react-router-dom";

import "../../static/styles/form.css";

function StudentLogin() {

  return (
    <>
      <h1>Login for registered Students</h1>
      <form className="form">
        <div className="box1">
          <div>
              <TextField className="inputFields" name="aadhar" type="number" label="Student Aadhar Card Number" required />
          </div>

          <div className="labelContainer date">
            <span className="label" htmlFor="">Date of Birth</span>
            <br />
            <TextField className="inputFields" type="date" name="dob" required />
          </div>

          <div>
            <TextField className="inputFields" name="password" type="password" label="Enter your Password" required />
          </div>

          <div className="button">
            <Button variant="contained" type="submit">
              LOGIN
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Button>
          </div>
        </div>
        <div>
          <img src={ login } className="loginSVG" />
        </div>
      </form>

      <div className="signUp-container">
        <Link to="/student/signUp">
          <Button variant="contained">
            <i className="fa-sharp fa-solid fa-user-plus"></i>
            New Registration
          </Button>
        </Link>
        <div className="">
          We are accepting fresh registrations for the eligible UP-domicile students!
          Click the button to proceed for the form filling!
        </div>
      </div>
    </>
  );
}

export default StudentLogin;