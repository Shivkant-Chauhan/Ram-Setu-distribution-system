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

let adminToken = null;
class adminController {
  static adminRegistration = async(req, res) => {
    const {userID, password} = req.body;
    
    const token = jwt.sign({ id: userID }, process.env.secretKey, { expiresIn: '30m' });

    const sqlQuery = `SELECT userID FROM adminRecords WHERE userID='${userID}'`;
    con.query(sqlQuery, async(err, result) => {
      if(err) throw err;

      if(result.length > 0) {
        adminToken = null;
        res.send("admin already exists");
      } else{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        // console.log(typeof hashPass);
        con.query(`INSERT INTO adminRecords (userID, password) VALUES ('${userID}', '${hashPass}')`, (err, result) => {
          if(err) throw err;
          console.log("admin created");
          adminToken = token;
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
            const token = jwt.sign({ id: userID }, process.env.secretKey, { expiresIn: '30m' });
            adminToken = token;
            response.send({
              "status": "success",
              "message": "login successful",
              "adminToken": token
            });
          } else {
            adminToken = null;
            response.send({
              "status": "failed",
              "message": "Invalid Credentials"
            });
          }
        } else {
          adminToken = null;
          response.statusCode = 404;
          response.send({
            "status": "failed",
            "message": "user not found"
          })
        }
      });
    } else {
      adminToken = null;
      response.send({
        "status": "failed",
        "message": "empty fields not allowed"
      })
    }
  }

  static adminDetails = async(req, res) => {
    if(adminToken){
      res.send({
        "adminToken": adminToken
      });
    } else {
      res.status(404).send({
        "status": "failed",
        "message": "cannot show student"
      })
    }
  }

  static delete_records = async(req, res) => {
    const { aadharID } = req.body;

    if(aadharID){
      try{
        con.query(`DELETE FROM studentsTable WHERE aadhar=${aadharID}`, async(err, res) => {
          if(err) throw err;
        });
        con.query(`DELETE FROM open WHERE aadhar=${aadharID}`, async(err, res) => {
          if(err) throw err;
        });
        con.query(`DELETE FROM girls WHERE aadhar=${aadharID}`, async(err, res) => {
          if(err) throw err;
        });
        con.query(`DELETE FROM minorities WHERE aadhar=${aadharID}`, async(err, res) => {
          if(err) throw err;
        });

        res.send({
          "status": "passed"
        })
      } catch(err) {
        console.log(err);
        res.send({
          "status": "failed"
        })
      }
    } else{
      res.send({
        "status": "failed"
      })
    }
  }
}

export default adminController;


// ADMIN CREDENTIALS
// "userID": "shivkant1039",
// "password": "shivi1039"