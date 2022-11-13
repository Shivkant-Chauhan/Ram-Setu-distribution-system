import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";

import "../../static/styles/feedback.css";

function FeedbackApp() {
  const [problemDesc, setDesc] = useState("");
  const [screenshot, setScreenshot] = useState("");
  
  async function submitFeedback(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/student/login/feedback", {
        problemDesc,
        screenshot
      }).then(async(response) => {
        let status = response.data.status;
        if(status === "success") {
          alert("Feedback Submitted. Thanks for your support!")
        }
      });

      window.open("/feedback", "_self");
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="problemForm">
      <h3>Describe the problem you'r facing..</h3>
      <form>
        <TextField
          id="outlined-multiline-static"
          label="Properly explain the issue you are facing."
          multiline
          className="descInput"
          rows={8}
          name="problem"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <br />
        <label className="label" htmlFor="income certificate">
          Screenshot (if any)
        </label>
        <br />
        <input
          className="ss"
          type="file"
          name="Screenshot (if any)"
          onChange={(e) => setScreenshot(e.target.value)}
        />
        <br />
        <Button variant="contained" className="feedback-btn-submit" type="submit" onClick={ submitFeedback }>
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

export default FeedbackApp;