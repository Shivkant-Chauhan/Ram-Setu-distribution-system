import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import login from "../../static/img/login.svg";
import { Link } from "react-router-dom";

import "../../static/styles/form.css";
import axios from "axios";

function StudentLogin() {
  const [aadhar, setAadhar] = useState("");
  const [password, setPass] = useState("");
  const [dob, setDOB] = useState("");

  const [path, setPath] = useState("/student/login");
  const [lockChecker, setLock] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:3001/student/login/isLockedStatus")
      .then(async (response) => {
        if(response.data.isLocked == 1) {
          setPath("/student/signUp");
          setLock(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function studentLoginHandler(e) {
    e.preventDefault();
    if(aadhar == '' || password == '' || dob == '') {
      alert("Invalid Credentials!");
      window.location.reload(false);
    } else {
      await axios.post("http://localhost:3001/student/login/signin", {
        aadhar,
        dob,
        password
      })
      .then((response) => {
        console.log(response);
        if(response.data.status == 'failed') {
          alert("Invalid Credentials!");
          window.location.reload(false);
        } else {
          window.open("/student/studentPortal", "_self");
        }
      })
      .catch((err) => {
        alert("Invalid Credentials!");
        window.location.reload(false);
        console.log(err);
      });
    }
  }
  

  return (
    <>
      <h1>Login for registered Students</h1>
      <form className="form">
        <div className="box1">
          <div>
            <TextField
              className="inputFields"
              name="aadhar"
              type="number"
              label="Student Aadhar Card Number"
              onChange={(e) => setAadhar(e.target.value)}
              required />
          </div>

          <div className="labelContainer date">
            <span className="label" htmlFor="">
              Date of Birth
            </span>
            <br />
            <TextField
              className="inputFields"
              type="date"
              name="dob"
              onChange={(e) => setDOB(e.target.value)}
              required />
          </div>

          <div>
            <TextField
              className="inputFields"
              name="password"
              type="password"
              label="Enter your Password"
              onChange={(e) => setPass(e.target.value)}
              required />
          </div>

          <div className="button">
            <Link to="/student/login/signin">
              <Button
                variant="contained"
                type="submit"
                onClick={ studentLoginHandler }>
                LOGIN
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <img src={ login } className="loginSVG" />
        </div>
      </form>

      <div className="signUp-container">
        <Link to={ path }>
          <Button 
            variant="contained"
            disabled={ lockChecker }
            >
            <i className="fa-sharp fa-solid fa-user-plus"></i>
            New Registration
          </Button>
        </Link>
        <div>
          We are accepting fresh registrations for the eligible UP-domicile
          students! Click the button to proceed for the form filling!
        </div>
      </div>
    </>
  );
}

export default StudentLogin;
