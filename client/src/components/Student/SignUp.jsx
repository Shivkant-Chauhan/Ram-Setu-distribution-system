import React from "react";
import Autocomplete from "react-google-autocomplete";
import TextField from "@mui/material/TextField";
import { InputLabel, Select, MenuItem, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import "../../static/styles/signUp.css";
import { useState } from "react";
import axios from "axios";


function SignUp() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [category, setCategory] = useState();
  const [gender, setGender] = useState("");
  const [scholarship, setScholarship] = useState();
  const [email, setEmail] = useState("");
  const [religion, setReligion] = useState();
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState();
  const [aadhar, setAadhar] = useState();
  const [dob, setDOB] = useState();
  const [income, setIncome] = useState(0);
  const [incomeCertificate, setIncomeCertificate] = useState();
  const [marks, setMarks] = useState(0);
  const [gradesheet, setGradesheet] = useState();
  const [categoryCerti, setCategoryCerti] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setcpassword] = useState();

  async function studentFormSubmit(e) {
    e.preventDefault();
    // add form validators here!
    // useHistory()..?

    try {
      await axios.post("http://localhost:3001/student/login/register", {
        fName,
        lName,
        category,
        gender,
        scholarship,
        email,
        religion,
        address,
        mobile,
        aadhar,
        dob,
        income,
        incomeCertificate,
        marks,
        gradesheet,
        categoryCerti,
        password,
        cpassword,
      });

      window.open("/student/studentPortal", "_self");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1>Fresh Registration for Students</h1>
      <form className="signUpForm">
        <div>
          <TextField
            id="outlined-name"
            label="FirstName"
            className="inputFields"
            name="fName"
            onChange={(e) => setfName(e.target.value)}
            required
          />
          <TextField
            id="outlined-name"
            label="LastName"
            className="inputFields"
            name="lName"
            onChange={(e) => setlName(e.target.value)}
            required
          />
        </div>

        <div>
          <FormControl className="inputFields" required>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="category"
              onChange={(e) => {
                setCategory(e.target.value);
                // if(e.target.value !== 'Minorities') minorityOnlyChecker = false;
                // else  minorityOnlyChecker = true;
                }
              }
              // onChange={handleChange}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Minorities">Minorities - SC/ST</MenuItem>
              <MenuItem value="PwD">PwD</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="inputFields" required>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="gender"
              onChange={(e) => {
                setGender(e.target.value);
                // if(e.target.value === "female")  setGirlsChecker(false);
                }
              }
              // onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="other">Others</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="inputFields" required>
            <InputLabel id="demo-simple-select-label">
              Select your Scheme
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="scholarship"
              onChange={(e) => setScholarship(e.target.value)}
              // onChange={handleChange}
            >
              <MenuItem value="open">Open to All</MenuItem>
              <MenuItem value="girls">Girls Only</MenuItem>
              <MenuItem value="minorities">Minorities</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/*
              TODO:
                render those schemes that the candidate is eligible for
          */}

        <div>
          <TextField
            className="inputFields"
            type="email"
            label="enter your email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormControl className="inputFields" required>
            <InputLabel id="demo-simple-select-label">
              Select Religion
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="category"
              name="religion"
              onChange={(e) => setReligion(e.target.value)}
              // onChange={handleChange}
            >
              <MenuItem value="hindu">HINDU</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <TextField
            id="outlined-multiline-static"
            label="Address"
            multiline
            className="inputFields"
            rows={4}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            required
            // defaultValue="Default Value"
          />

          {/* auto fetch address */}
          {/* <Autocomplete
            apiKey=""
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          /> */}
        </div>

        <div>
          <TextField
            className="inputFields"
            type="number"
            label="Student Mobile Number"
            name="mobile"
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            className="inputFields"
            type="number"
            label="Student Aadhar Card Number"
            name="aadhar"
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
        </div>

        <div className="labelContainer date">
          <label className="label" htmlFor="">
            Date of Birth
          </label>
          <br />
        </div>
        <TextField
          className="inputFields"
          type="date"
          name="dob"
          onChange={(e) => setDOB(e.target.value)}
          required
        />

        <div>
          <TextField
            className="inputFields"
            type="number"
            name="income"
            label="Family Annual Income"
            onChange={(e) => setIncome(e.target.value)}
            required
          />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="income certificate">
            Upload your income certificate
          </label>
          <br />
          <input
            className="file"
            type="file"
            name="incomeCertificate"
            onChange={(e) => setIncomeCertificate(e.target.value)}
            required
          />
        </div>

        <div>
          <TextField
            className="inputFields"
            type="number"
            label="Total marks out of 500"
            name="marks"
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="gradesheet">
            Upload your gradesheet
          </label>
          <br />
          <input
            className="file"
            type="file"
            name="gradesheet"
            onChange={(e) => setGradesheet(e.target.value)}
            required
          />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="category certificate">
            Upload your category certificate: if applicable
          </label>
          <br />
          <input
            className="file"
            type="file"
            name="categoryCertificate"
            onChange={(e) => setCategoryCerti(e.target.value)}
          />
        </div>

        <TextField
          className="inputFields"
          type="password"
          label="Enter your Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          className="inputFields"
          type="password"
          label="Confirm your Password"
          name="cpassword"
          onChange={(e) => setcpassword(e.target.value)}
          required
        />

        <div className="button">
            <Button variant="contained" type="submit" onClick={ studentFormSubmit }>
              SUBMIT
            </Button>
        </div>

      </form>
    </>
  );
}

export default SignUp;
