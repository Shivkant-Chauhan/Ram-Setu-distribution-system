import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

function AdminPortal() {
  const [openScholar, setOpenScholar] = useState("");
  const [girlsScholar, setGirlsScholar] = useState("");
  const [minorityScholar, setMinorityScholar] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/admin/login/adminDetails").then(async(response) => {
      console.log(response, "shivi");
      // TODO: add cookie when new user login or exisiting sign-in, then extract the token either from the cookie or from the response
      let token = response.data.adminToken;
      if(token) {
        const cookie = new Cookies();
        cookie.set('admin_token', token);
      } else {
        token = Cookies.get('admin_token');
      }
      // console.log(Cookies.get('jwt_token'), "shiv");
      console.log(token, "admin TOKEN");

      await axios.post("http://localhost:3001/admin/login/auth_middleware", {token}
      ).then((response) => {
        console.log(response, "::::");
        setOpenScholar(response.data.open);
        setGirlsScholar(response.data.girls);
        setMinorityScholar(response.data.minorities);
        console.log(openScholar, girlsScholar, minorityScholar, ">>>..");
      }).catch((err) => console.log(err));
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <>sdfs</>
  );
}

export default AdminPortal;