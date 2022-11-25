import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shiviTesting"
});
con.connect((err) => {
  if(err) throw err;
  console.log("Connected with database!");
});

let studentToken = null;
class studentRegistrationController {
  static studentRegistration = async(req, res) => {
    const { fName, lName, category, gender, scholarship, email, religion, address, mobile, aadhar, dob, income, incomeCertificate, marks, gradesheet, categoryCerti, password } = req.body;
    console.log(req.body);
    
    const sqlQuery = `SELECT aadhar FROM studentsTable WHERE aadhar=${aadhar}`;
    con.query(sqlQuery, async(err, result) => {
      if(err) throw err;

      if(result.length > 0) {
        studentToken = null;
        console.log("user exists");
        res.send("user already present");
      } else{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        
        const token = jwt.sign({ id: aadhar }, process.env.secretKey, { expiresIn: '30m' });
        console.log(scholarship, "shivkant.. scholarship name");
        let sql = `INSERT INTO ${scholarship} (aadhar, marks) VALUES (${aadhar}, ${marks})`;
        con.query(sql, (err, res) => {
          if(err) throw err;
        });

        sql = `INSERT INTO studentsTable (fName, lName, category, gender, scholarship, email, religion, address, mobile, aadhar, dob, income, incomeCertificate, marks, gradesheet, categoryCerti, password) VALUES ('${fName}', '${lName}', '${category}', '${gender}', '${scholarship}', '${email}', '${religion}', '${address}', ${mobile}, ${aadhar}, '${dob}', ${income}, '${incomeCertificate}', ${marks}, '${gradesheet}', '${categoryCerti}', '${hashPass}')`;
        con.query(sql, (err, result) => {
          if(err) throw err;
          console.log("student added");
          studentToken = token;
          res.send({
            "status": "OK",
            "message": "student record added",
            "token": token
          });
        });

      }
    });
  }

  static studentLogin = async(req, response) => {
    const {aadhar, dob, password} = req.body;
    if(aadhar && dob && password) {
      con.query(`SELECT * FROM studentsTable WHERE studentsTable.aadhar=${aadhar}`, async(err, res) => {
        if(err){
          studentToken = null;
          throw err;
        }
        if(res.length > 0){
          const isMatch = await bcrypt.compare(password, res[0].password);
          if(res[0].aadhar==aadhar && isMatch) {
            const token = jwt.sign({ id: aadhar }, process.env.secretKey, { expiresIn: '30m' });
            studentToken = token;
            response.send({
              "status": "success",
              "message": "login successful",
              "token": token,
            });
          } else {
            studentToken = null;
            response.send({
              "status": "failed",
              "message": "Invalid Credentials"
            });
          }
          
        } else {
          studentToken = null;
          response.statusCode = 404;
          response.send({
            "status": "failed",
            "message": "user not found"
          })
        }
      });
    } else {
      studentToken = null;
      response.send({
        "status": "failed",
        "message": "empty fields not allowed"
      })
    }
  }

  // TODO: can also implement change password and forget password.. (in a protected route!)

  static loggedUserDetails = async(req, res) => {
    if(studentToken){
      res.send({
        "studentToken": studentToken
      });
    } else {
      res.status(404).send({
        "status": "failed",
        "message": "cannot show student"
      })
    }
  }

  static feedback = async(req, response) => {
    const {problemDesc, screenshot} = req.body;
    let sql = `INSERT INTO feedbacks (description, screenshot) VALUES ('${problemDesc}', '${screenshot}')`;
    con.query(sql, async(err, res) => {
      if(err) throw err;
      console.log("feedback submitted");
      response.send({
        "status": "success"
      });
    });
  }

  static isLockedStatus = async(res, response) => {
    let sql = `SELECT isLocked FROM locks`;
    con.query(sql, async(err, res) => {
      if(err) throw err;
      console.log(res[0].isLocked);
      response.send({
        "isLocked": res[0].isLocked
      })
    });
  }
}

export default studentRegistrationController;
