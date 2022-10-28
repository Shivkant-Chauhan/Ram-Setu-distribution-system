import axios from "axios";
import React, { useEffect } from "react";
// import request from "request";
var request = require("request-promise");

function StudentPortal() {
  useEffect(() => {
    const options = {
      method: "GET",
      url: "localhost:3001/student/login/studentDetails",
      headers: {
        Authorization: "Bearer <JWT PASTED HERE>",
        "Content-Type": "application/json",
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  }, []);

  return <></>;
}

export default StudentPortal;
