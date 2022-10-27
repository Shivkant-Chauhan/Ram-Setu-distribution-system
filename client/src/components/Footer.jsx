import React from "react";

import "../static/styles/footer.css"

function Footer() {
  return (
    <div className="footer">
      <p>
        This web site is designed and developed by : <strong>Shivi Enterprises</strong> and jointly maintained Shivkant Chauhan, Rameshwar Paryani and Rishabh Gupta!
      </p>
      <div className="contact">
        <h3>Contact US</h3>
        <div>
          Helpline Numbers
        </div>
      </div>

      <div className="govt">
        <i className="fa-solid fa-period"></i>
        Government of Uttar Pradesh
        <i className="fa-solid fa-period"></i>
      </div>
    </div>
  );
}

export default Footer;