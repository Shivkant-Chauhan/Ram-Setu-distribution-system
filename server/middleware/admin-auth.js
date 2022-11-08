import mysql from 'mysql';
import jwt from 'jsonwebtoken';

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


// middleware for checking the authentication !
const adminAuth = async(req, res) => {
  let token = req.body.token;
  if(token) {
    try{
      // verifying token
      const { id } = jwt.verify(token, process.env.secretKey);
      

      let students, openSize, girlsSize, minoritySize;
      con.query(`SELECT * FROM studentsTable ORDER BY marks DESC`, async(err, result) => {
        if(err) throw err;
        students = result;
      });
      con.query(`SELECT COUNT(aadhar) FROM studentsTable WHERE scholarship='open'`, async(err, result) => {
        if(err) throw err;
        openSize = result;
      })
      con.query(`SELECT COUNT(aadhar) FROM studentsTable WHERE scholarship='girls'`, async(err, result) => {
        if(err) throw err;
        girlsSize = result;
      })
      con.query(`SELECT COUNT(aadhar) FROM studentsTable WHERE scholarship='minorities'`, async(err, result) => {
        if(err) throw err;
        minoritySize = result;
      })

      setTimeout(() => {
        res.send({
          "studentsTable": students,
          "openSize": openSize,
          "girlsSize": girlsSize,
          "minoritySize": minoritySize
        });
      }, 100);

    } catch(err) {
      console.log(err);
      res.status(401).send({
        "status": "Unauthorized User"
      });
    }
  }
  if(!token) {
    res.status(401).send({
      "status": "failed",
      "message": "unauthorized user, no token found!"
    });
  }
}

export default adminAuth;