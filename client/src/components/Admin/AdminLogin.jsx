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
    if(password == '' || userID == '') {
      alert("Invalid Credentials!");
      window.location.reload(false);
    } else {
      await axios.post("http://localhost:3001/admin/login/signin", {
        userID,
        password
      })
      .then((response) => {
        console.log(response, "sss");
        if(response.data.status == 'failed') {
          alert("Invalid Credentials!");
          window.location.reload(false);
        } else {
          window.open("/admin/adminPortal", "_self");
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
      <form action="" method="post" className="form2">
        <div>
            <TextField className="inputFields" type="text" label="ADMIN userID" onChange={(e) => setID(e.target.value)} required />
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