import React from "react";
import Portal from "./Portal";

import "../static/styles/portalBox.css";
import student from "../static/img/student.png";
import admin from "../static/img/admin.jpg";



function PortalBox() {
  const studentDesc = "STUDENT LOGIN PORTAL";
  const adminDesc = "ADMIN LOGIN PORTAL";
  return (
    <>
      <div className="portalBox">
        <Portal logo={student} desc={studentDesc} routingPage="student" />
        <Portal logo={admin} desc={adminDesc} routingPage="admin" />
      </div>
      
    </>
  );
}

export default PortalBox;
