import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

function AdminFeedback() {
  let temp = [
    {
      description: ""
    }
  ];

  const [issue, setIssue] = useState(temp);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/login/feedback")
      .then(async (response) => {
        console.log(response.data.userFeedbacks, "shiviiii");
        setIssue(response.data.userFeedbacks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function issueResolved(desc) {
    axios
      .post("http://localhost:3001/admin/login/issueResolved", { desc })
      .then(async (response) => {
        let status = response.data.status;
        if (status === "passed") {
          alert("Issue resolved successfully!");
        } else {
          alert(`Error in resolving the issue`);
        }
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="adminFeedback">
      <h3>Issues reported by users</h3>
      <table className="feedbackTable">
        <tr>
          <th>Issue Description</th>
          <th>Click to Resolve</th>
        </tr>
        {issue.map((i, id) => {
          return(
            <tr key={id}>
              <td>{i.description}</td>
              <td>
              <Button
                variant="contained"
                type="submit"
                onClick={ () => issueResolved(i.description) }
                style={{ backgroundColor: "green" }}
              >
                Resolved
              </Button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default AdminFeedback;