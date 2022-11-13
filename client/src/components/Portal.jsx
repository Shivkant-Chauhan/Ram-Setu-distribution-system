import React from "react";
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";
// import Student from "./Student/Student"
// import Admin from "./Admin/Admin"

import "../static/styles/portal.css";

function Portal(props) {

  let route;
  if(props.routingPage === "student") {
    route = "/student";
  } else if(props.routingPage === "admin"){
    route = "/admin";
  } else {
    route = "/feedback";
  }

  return (
    <div className="recent-flexbox">
      <div className="box-rec">
          <img src={props.logo} alt="11" className="boxIMG" />
          <div className="boxCONT">
              <p>{props.desc}</p>
              <Link to={route} className="portal-btn">
                  Visit Portal 
                  <i className="fa-solid fa-caret-right"></i>
              </Link>
          </div>
      </div>
    </div>
  );
}

export default Portal;