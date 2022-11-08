import axios from "axios";
import Cookies from 'universal-cookie';
import React, { useEffect } from "react";
import GuestUser from "./GuestUser";
import "../../static/styles/loggedIn.css"
import { useState } from "react";
import { Button } from '@mui/material';
import { Link } from "react-router-dom";


function StudentPortal() {
  let user;
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [mail, setMail] = useState("");
  const [scholarship, setscholar] = useState("");
  const [religion, setReligion] = useState("");
  const [marks, setMarks] = useState("");
  const [mobile, setMob] = useState("");
  const [rank, setRank] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    user = null;
    axios.get("http://localhost:3001/student/login/studentDetails").then(async(response) => {
      console.log(response, "shivi");
      // TODO: add cookie when new user login or exisiting sign-in, then extract the token either from the cookie or from the response
      let token = response.data.studentToken;
      if(token) {
        const cookie = new Cookies();
        cookie.set('jwt_token', token);
      } else {
        token = Cookies.get('jwt_token');
      }
      // console.log(Cookies.get('jwt_token'), "shiv");

      await axios.post("http://localhost:3001/student/login/auth_middleware", {token}
      ).then((response) => {
        console.log(response.data.user, "res");
        user = response.data.user;
        setRank(response.data.rank);
        setTotal(response.data.total);
        setFName(user.fName);
        setLName(user.lName);
        setCategory(user.category);
        setGender(user.gender);
        setMail(user.email);
        setscholar(user.scholarship);
        setReligion(user.religion);
        setMarks(user.marks);
        setMob(user.mobile);

        if(user.scholarship == 'open'){
          if(response.data.rank <= 500) {
            alert(`Congrats ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are eligible for the prizes as you have applied in Open to all Scholarship`);
          } else{
            alert(`Sorry ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are not eligible for the prizes as you have applied in Open to all Scholarship`);
          }
        } else if(user.scholarship == 'girls'){
          if(response.data.rank <= 250) {
            alert(`Congrats ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are eligible for the prizes as you have applied in Girls only Scholarship`);
          } else{
            alert(`Sorry ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are not eligible for the prizes as you have applied in Girls only Scholarship`);
          }
        } else {
          if(response.data.rank <= 150) {
            alert(`Congrats ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are eligible for the prizes as you have applied in Minorities only Scholarship`);
          } else{
            alert(`Sorry ${user.fName}, according to the current leaderboard: (rank ${response.data.rank}), you are not eligible for the prizes as you have applied in Minorities only Scholarship`);
          }
        }
      }).catch((err) => console.log(err));
    }).catch((err) => {
      console.log(err, "shiv bhai error");
    })
  }, []);

  function logOut(e) {
    const cookie = new Cookies();
    cookie.set('jwt_token', null);
  }

  if(user === null) {
    return (
      <GuestUser />
    );
  } else {
    return (
      <>
        <div className="logOutBTN">
          <Link to="/student/login">
            <Button variant="contained" type="submit" className="dangerBtn" onClick={logOut} style={{backgroundColor: "red"}}>LOG-OUT</Button>
          </Link>
        </div>
        <div className="personal">
          <h1>Personal Details</h1>
          <strong>Hi {fName}, Pleasure to see you here!</strong>
          <p><strong>Full Name:</strong> {fName} {lName}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Mail ID:</strong> {mail}</p>
          <p><strong>Scholarship applied for:</strong> {scholarship}</p>
          <p><strong>Religion:</strong> {religion}</p>
          <p><strong>Marks Obtained:</strong> {marks}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
        </div>
        <div className="leaderBoard">
          <strong>{fName}</strong>, you current rank on the leaderboard is <strong>{rank}</strong>... <br />
          and the total student who applied for this {scholarship} scholarship are <strong>{total}</strong>
        </div>
      </>
    );
  }
}

export default StudentPortal;
