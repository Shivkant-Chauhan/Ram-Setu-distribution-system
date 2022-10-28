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


// middleware for checking the authentication !
const checkUserAuth = async(req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(authorization);
  if(authorization && authorization.startsWith('Bearer')) {
    try{
      // console.log(authorization);
      token = authorization.split(' ')[1] // as token in form for : Bearer <token> : after a space!

      // verifying token
      const { id } = jwt.verify(token, process.env.secretKey);
      // here id is my aadhar of the user as it is the primary key of the users that i have used in jwt.sign()!
      let user;
      con.query(`SELECT * FROM studentsTable WHERE studentsTable.aadhar=${id}`, async(err, result) => {
        if(err) throw err;
        console.log(result[0]);
        user = result[0];
      });

      setTimeout(() => {
        req.user = user;
      }, 1000);
      next();
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

export default checkUserAuth;