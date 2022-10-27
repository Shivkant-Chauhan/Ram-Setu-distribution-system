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

class studentRegistrationController {
  static studentRegistration = async(req, res) => {
    const {aadhar, password} = req.body;
    
    const sqlQuery = `SELECT aadhar FROM studentsTable WHERE aadhar=${aadhar}`;
    con.query(sqlQuery, async(err, result) => {
      if(err) throw err;

      if(result.length > 0) {
        res.send("user already present");
      } else{
        // if(password != cpassword){
        //   res.send("password not matches");
        // }
        // can add more validations
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(typeof hashPass);
        
        const token = jwt.sign({ id: aadhar }, process.env.secretKey, { expiresIn: '30m' });
        con.query(`INSERT INTO studentsTable (aadhar, password) VALUES (${aadhar}, '${hashPass}')`, (err, result) => {
          if(err) throw err;
          console.log("student added");
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
        if(err) throw err;
        if(res.length > 0){
          const isMatch = await bcrypt.compare(password, res[0].password);
          if(res[0].aadhar===aadhar && isMatch) {

            const token = jwt.sign({ id: aadhar }, process.env.secretKey, { expiresIn: '30m' });
            response.send({
              "status": "success",
              "message": "login successful",
              "token": token
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

  // TODO: can also implement change password and forget password..
}

export default studentRegistrationController;
