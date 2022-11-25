import React from "react";

import "../static/styles/footer.css"

function Footer() {
  return (
    <div className="footer">
      <p>
        This web site is designed and developed by : <strong>Shivi Enterprises</strong> and jointly maintained by Shivkant Chauhan, Rameshwar Paryani and Rishabh Gupta!<br /><br />Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quos fugiat ipsum vitae nobis eum ipsam accusantium exercitationem vero quia, asperiores, vel soluta possimus. Beatae, earum quisquam, labore nemo corporis accusamus dolorum laboriosam, explicabo dignissimos officia reiciendis iusto impedit porro neque vero perferendis voluptates reprehenderit magni quaerat consequatur ex dolore? Cupiditate quam aliquid dolores expedita aliquam excepturi ab alias laboriosam!
      </p>
      <div className="contact">
        <h3>Contact US</h3>
        <p>21bcs192@iiitdmj.ac.in</p>
        <div>
          Helpline Numbers <br />
          9999705977 <br />
          7028199633 <br /><br />
        </div>
      </div>

      <div className="govt">
        <i className="fa-solid fa-period"></i>
        <span class="dot"></span> Government of Uttar Pradesh <span class="dot"></span>
        <i className="fa-solid fa-period"></i>
      </div>
    </div>
  );
}

export default Footer;