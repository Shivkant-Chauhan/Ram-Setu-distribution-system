import React from "react";
import Portal from "./Portal";

import "../static/styles/portalBox.css";
import student from "../static/img/student.png";
import admin from "../static/img/admin.jpg";
import feedback from "../static/img/feedback.png";



function PortalBox() {
  const studentDesc = "STUDENT LOGIN PORTAL";
  const adminDesc = "ADMIN LOGIN PORTAL";
  const feedbackDesc = "Feedbacks for improvements!"
  return (
    <>
      <div className="portalBox">
        <Portal logo={student} desc={studentDesc} routingPage="student" />
        <Portal logo={admin} desc={adminDesc} routingPage="admin" />
        <Portal logo={feedback} desc={feedbackDesc} routingPage="feedback" />
      </div>
      
    </>
  );
}

export default PortalBox;
