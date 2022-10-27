import React from "react";
import Autocomplete from "react-google-autocomplete";
import TextField from "@mui/material/TextField";
import { InputLabel, Select, MenuItem, Button } from '@mui/material';
import FormControl from "@mui/material/FormControl";

import "../../static/styles/signUp.css";

// import wrappingUp from "../../static/motionBackground";

// setTimeout(() => {
//   wrappingUp();
// }, 100);

function SignUp() {
  return (
    <>
      <h1>Fresh Registration for Students</h1>
      <form className="signUpForm">
        <div>
          <TextField
            id="outlined-name"
            label="FirstName"
            className="inputFields"
            required
            // value={name}
            // onChange={handleChange}
          />
          <TextField
            id="outlined-name"
            label="LastName"
            className="inputFields"
            required
            // defaultValue="foo"
          />
        </div>

        <div>
          <FormControl className="inputFields" required>

            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="category"
              // onChange={handleChange}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="scst">SC/ST</MenuItem>
              <MenuItem value="pwd">PwD</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="inputFields" required>

            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="category"
              // onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="other">Others</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="inputFields" required>

            <InputLabel id="demo-simple-select-label">Select your Scheme</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="category"
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
          <TextField className="inputFields" type="email" label="enter your email" id="email" required />

          <FormControl className="inputFields" required>

            <InputLabel id="demo-simple-select-label">Select Religion</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="category"
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
          <TextField className="inputFields" type="number" label="Student Mobile Number" required />
        </div>
        <div>
          <TextField className="inputFields" type="number" label="Student Aadhar Card Number" required />
        </div>

        <div className="labelContainer date">
          <label className="label" htmlFor="">Date of Birth</label>
          <br />
        </div>
        <TextField className="inputFields" type="date" label="" required />

        <div>
          <TextField className="inputFields" type="number" label="Family Annual Income" required />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="income certificate">Upload your income certificate</label><br />
          <input className="file" type="file" required />
        </div>

        <div>
          <TextField className="inputFields" type="number" label="Total marks out of 500" required />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="gradesheet">Upload your gradesheet</label><br />
          <input className="file" type="file" required />
        </div>
        <div className="labelContainer">
          <label className="label" htmlFor="category certificate">
            Upload your category certificate: if applicable
          </label><br />
          <input className="file" type="file" />
        </div>

        <TextField className="inputFields" type="password" label="Enter your Password" required />
        <TextField className="inputFields" type="password" label="Confirm your Password" required />

        <div className="button">
          <Button variant="contained" type="submit">SUBMIT</Button>
        </div>

      </form>
    </>
  );
}

export default SignUp;
