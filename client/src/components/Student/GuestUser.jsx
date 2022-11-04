import React from "react";
import guest from "../../static/img/unauthenticated.png";
import "../../static/styles/main.css";

function GuestUser() {
  return (
    <div id="img">
      <img src={guest} />
    </div>
  );
}

export default GuestUser;