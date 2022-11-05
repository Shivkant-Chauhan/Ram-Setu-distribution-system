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
      let openScholarship, girlsScholarship, minoritiesScholarship;
      con.query(`SELECT * FROM open`, async(err, result) => {
        if(err) throw err;
        openScholarship = result;
      });
      con.query(`SELECT * FROM girls`, async(err, result) => {
        if(err) throw err;
        girlsScholarship = result;
      });
      con.query(`SELECT * FROM minorities`, async(err, result) => {
        if(err) throw err;
        minoritiesScholarship = result;
      });

      setTimeout(() => {
        res.send({
          "open": openScholarship,
          "girls": girlsScholarship,
          "minorities": minoritiesScholarship
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