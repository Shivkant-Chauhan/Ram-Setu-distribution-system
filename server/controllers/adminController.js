import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';

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

class adminController {
  static adminRegistration = async(req, res) => {
    const {userID, password} = req.body;
    
    const sqlQuery = `SELECT userID FROM adminRecords WHERE userID='${userID}'`;
    con.query(sqlQuery, async(err, result) => {
      if(err) throw err;

      if(result.length > 0) {
        res.send("admin already exists");
      } else{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(typeof hashPass);
        con.query(`INSERT INTO adminRecords (userID, password) VALUES ('${userID}', '${hashPass}')`, (err, result) => {
          if(err) throw err;
          console.log("admin created");
          res.send("added!");
        });
      }
    });
  }

  static adminLogin = async(req, response) => {
    const {userID, password} = req.body;
    if(userID && password) {
      con.query(`SELECT * FROM adminRecords WHERE adminRecords.userID='${userID}'`, async(err, res) => {
        if(err) throw err;
        if(res.length > 0){
          const isMatch = await bcrypt.compare(password, res[0].password);
          if(res[0].userID===userID && isMatch) {
            response.send({
              "status": "success",
              "message": "login successful"
            });
          } else {
            response.send({
              "status": "failed",
              "message": "Invalid Credentials"
            });
          }
        } else {
          response.statusCode = 404;
          response.send({
            "status": "failed",
            "message": "user not found"
          })
        }
      });
    } else {
      response.send({
        "status": "failed",
        "message": "empty fields not allowed"
      })
    }
  }
}

export default adminController;


// ADMIN CREDENTIALS
// "userID": "shivkant1039",
// "password": "shivi1039"