import React from "react";
import { Button } from '@mui/material';
import TextField from "@mui/material/TextField";

function AdminLogin() {
  return (
    <>
      <form action="" method="post" className="form">
        <div>
            <TextField className="width70" type="text" label="ADMIN userID" required />
        </div>

        <div>
          <TextField className="inputFields" type="password" label="Enter your Password" required />
        </div>

        <div className="button">
          <Button variant="contained" type="submit">LOGIN</Button>
        </div>
      </form>
    </>
  );
}

export default AdminLogin;