let mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shiviTesting"
});

// CREATING TABLE
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   let sql = "CREATE TABLE helper (aadhar integer(12), password varchar(25), dob Date)";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// INSERTING VALUES
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO helper (aadhar, dob, password) VALUES (123456, '2002-12-31', 'shivkant')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

// EXTRACTING VALUES
// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });
