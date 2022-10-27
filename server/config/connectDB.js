import mysql from 'mysql';

async function connectDB() {
  try{
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "shiviTesting"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected with database!");
    });
  } catch(error) {
    console.log(error);
  }
}

// module.exports.connectDB = connectDB();
export default connectDB;