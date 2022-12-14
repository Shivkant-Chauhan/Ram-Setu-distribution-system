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
const checkUserAuth = async(req, res) => {
  let token = req.body.token;
  if(token) {
    try{
      // verifying token
      const { id } = jwt.verify(token, process.env.secretKey);
      // here id is my aadhar of the user as it is the primary key of the users that i have used in jwt.sign()!
      let user;
      con.query(`SELECT * FROM studentsTable WHERE studentsTable.aadhar=${id}`, async(err, result) => {
        if(err) throw err;
        user = result[0];
      });

      let rank;
      let total;
      setTimeout(async() => {
        await con.query(`SELECT RANK() OVER(ORDER BY marks DESC) FROM ${user.scholarship} WHERE aadhar=${user.aadhar}`, async(err, result) => {
          if(err) throw err;
          rank = result[0]['RANK() OVER(ORDER BY marks DESC)'];
        });
        await con.query(`SELECT COUNT(aadhar) FROM ${user.scholarship}`, async(err, result) => {
          if(err) throw err;
          console.log(result);
          total = result[0]['COUNT(aadhar)'];
        });
        setTimeout(() => {
          console.log(user);
          res.send({
            "user": user,
            "rank": rank,
            "total": total
          });
        }, 100);
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

export default checkUserAuth;