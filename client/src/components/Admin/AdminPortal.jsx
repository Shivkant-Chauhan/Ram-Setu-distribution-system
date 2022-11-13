import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import "../../static/styles/adminPortal.css";

function AdminPortal() {
  // let students = [],
  //   size = 0;
  let temp = [
    {
      aadhar: "",
      full_name: "",
      category: "",
      gender: "",
      email: "",
      mobile: "",
      dob: "",
      marks: "",
      religion: "",
      income: "",
      address: "",
      docs: "",
    },
  ];

  const [openSize, setOpenSize] = useState(0);
  const [girlSize, setGirlSize] = useState(0);
  const [minoritySize, setMinoritySize] = useState(0);

  const [students, setStudent] = useState(temp);
  const [size, setSize] = useState(0);

  const [aadharID, setAadharID] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/login/adminDetails")
      .then(async (response) => {
        console.log(response, "shivi");
        // TODO: add cookie when new user login or exisiting sign-in, then extract the token either from the cookie or from the response
        let token = response.data.adminToken;
        if (token) {
          const cookie = new Cookies();
          cookie.set("admin_token", token);
        } else {
          token = Cookies.get("admin_token");
        }
        // console.log(Cookies.get('jwt_token'), "shiv");
        console.log(token, "admin TOKEN");

        await axios
          .post("http://localhost:3001/admin/login/auth_middleware", { token })
          .then(async (response) => {
            setStudent(response.data.studentsTable);
            setSize(students.length);
            setOpenSize(response.data.openSize[0]["COUNT(aadhar)"]);
            setGirlSize(response.data.girlsSize[0]["COUNT(aadhar)"]);
            setMinoritySize(response.data.minoritySize[0]["COUNT(aadhar)"]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function logOut(e) {
    const cookie = new Cookies();
    cookie.set("jwt_token", null);
  }

  function deleteRecordHandler() {
    axios
      .post("http://localhost:3001/admin/login/delete_record", { aadharID })
      .then(async (response) => {
        let status = response.data.status;
        if (status === "passed") {
          alert("Record deleted successfully!");
        } else {
          alert(`Error in deleting this id: ${aadharID}`);
        }
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="logOutBTN">
        <Link to="/admin/feedbacks">
          <Button
            variant="contained"
            type="submit"
          >
            User Feedbacks
          </Button>
        </Link>
        <Link to="/admin">
          <Button
            variant="contained"
            type="submit"
            onClick={logOut}
            style={{ backgroundColor: "red" }}
          >
            LOG-OUT
          </Button>
        </Link>
      </div>

      <div className="delete-box">
        Enter the aadhar of student to delete the record of that student due to
        discrepancy in data or documents!.
        <br />
        <div className="d-flex btn-box">
          <TextField
            id="outlined-name"
            label="AADHAR NUMBER of student"
            name="aadharID"
            className="aadharInp"
            onChange={(e) => setAadharID(e.target.value)}
            required
          />
          <Button
            variant="contained"
            type="submit"
            onClick={deleteRecordHandler}
          >
            DELETE RECORD
          </Button>
        </div>
      </div>

      <h2>Leaderboards details!</h2>
      <div className="schloarship">
        <h3>Open to All Scholarship (total prizes: 500)</h3>
        <h5>Total students applied: {openSize}</h5>
        <table>
          <tr>
            <th>Aadhar Number</th>
            <th>Full Name</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Marks</th>
            <th>Religion</th>
            <th>Family Annual Income</th>
            <th>Address</th>
          </tr>
          {students.map((user) =>
            user.scholarship === "open" ? (
              <tr key={user.aadhar}>
                <td>{user.aadhar}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.category}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.marks}</td>
                <td>{user.religion}</td>
                <td>{user.income}</td>
                <td>{user.address}</td>
              </tr>
            ) : null
          )}
        </table>
      </div>
      <div className="schloarship">
        <h3>Scholarship only for Girls (total prizes: 250)</h3>
        <h5>Total students applied: {girlSize}</h5>
        <table>
          <tr>
            <th>Aadhar Number</th>
            <th>Full Name</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Marks</th>
            <th>Religion</th>
            <th>Family Annual Income</th>
            <th>Address</th>
          </tr>
          {students.map((user) =>
            user.scholarship === "girls" ? (
              <tr key={user.aadhar}>
                <td>{user.aadhar}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.category}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.marks}</td>
                <td>{user.religion}</td>
                <td>{user.income}</td>
                <td>{user.address}</td>
              </tr>
            ) : null
          )}
        </table>
      </div>
      <div className="schloarship">
        <h3>Scholarship only for Minority students (total prizes: 150)</h3>
        <h5>Total students applied: {minoritySize}</h5>
        <table>
          <tr>
            <th>Aadhar Number</th>
            <th>Full Name</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Marks</th>
            <th>Religion</th>
            <th>Family Annual Income</th>
            <th>Address</th>
          </tr>
          {students.map((user) =>
            user.scholarship === "minorities" ? (
              <tr key={user.aadhar}>
                <td>{user.aadhar}</td>
                <td>
                  {user.fName} {user.lName}
                </td>
                <td>{user.category}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.marks}</td>
                <td>{user.religion}</td>
                <td>{user.income}</td>
                <td>{user.address}</td>
              </tr>
            ) : null
          )}
        </table>
      </div>
    </>
  );
}

export default AdminPortal;
