import React from "react";
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";

function AdminLogin() {
  const [userID, setID] = useState("");
  const [password, setAdminPass] = useState("");

  async function studentLoginHandler(e) {
    e.preventDefault();
    console.log("shivkant", userID, password);
    await axios.post("http://localhost:3001/admin/login/signin", {
      userID,
      password
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

    window.open("/admin/adminPortal", "_self");
  }

  return (
    <>
      <form action="" method="post" className="form">
        <div>
            <TextField className="width70" type="text" label="ADMIN userID" onChange={(e) => setID(e.target.value)} required />
        </div>

        <div>
          <TextField className="inputFields" type="password" label="Enter your Password" onChange={(e) => setAdminPass(e.target.value)} required />
        </div>

        <div className="button">
          <Button variant="contained" type="submit" onClick={ studentLoginHandler }>LOGIN</Button>
        </div>
      </form>
    </>
  );
}

export default AdminLogin;