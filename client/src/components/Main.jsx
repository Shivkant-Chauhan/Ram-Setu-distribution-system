import React from "react";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import StudentApp from "./Student/StudentApp";
import SignUp from "./Student/SignUp";
import AdminApp from "./Admin/AdminApp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Form,
} from 'react-router-dom';

import '../static/styles/main.css'
import StudentLogin from "./Student/StudentLogin";

// import wrappingUp from "../static/motionBackground";

// setTimeout(() => {
//   wrappingUp();
// }, 100);

function Main(){
  return (
    <Router>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      <canvas className="orb-canvas"></canvas>  {/* for my Motion background! */}
      <Header />
      {/* <Landing />
      <PortalBox /> */}
      <Routes>
        <Route exact path="/" element={ <Home /> }></Route>
        <Route exact path="/student" element={ <StudentApp /> }></Route>
        <Route exact path="/admin" element={ <AdminApp /> }></Route>

        <Route exact path="/student/login" element={ <StudentLogin /> } method="POST"></Route>
        <Route exact path="/student/signup" element={ <SignUp /> }></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default Main;