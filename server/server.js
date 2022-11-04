import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';  // cross-origin resource sharing for secure requests!
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());


app.use("/student/login", userRoutes);
app.use("/admin/login", adminRoutes);


// connectDB;

// const generateAccessToken = (user) => {
//   return jwt.sign(
//       { id: user.id, isAdmin: user.isAdmin },
//       process.env.secretKey,
//       { expiresIn: "15m" }  // token expires in 15minutes
//     );
// }
// const generateRefreshToken = (user) => {
//   return jwt.sign(
//     { id: user.id, isAdmin: user.isAdmin },
//     process.env.secretKey,
//   );
// }

// const users = [
//   {
//     aadhar: 123456,
//     // dob: new Date(11/12/2002),
//     password: "shivkant",
//     isAdmin: false,
//   },
// ];

// let refreshTokens = []; // get this from database!
// app.post("/student/refresh", (req, res) => {
//   const refreshToken = req.body.token;

//   if(!refreshToken) {
//     return res.status(401).json("Not Authenticated!");
//   }

//   if(!refreshTokens.includes(refreshToken)) {
//     return res.status(403).json("Refresh Token not valid!");
//   }

//   jwt.verify(refreshToken, process.env.secretKey, (err, user) => {
//     err && console.log(err);
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//     const newAccessToken = generateAccessToken(user);
//     const newRefreshToken = generateRefreshToken(user);

//     refreshTokens.push(newRefreshToken);

//     res.status(200).json({
//       accessToken : newAccessToken,
//       refreshToken: newRefreshToken
//     });
//   });

// });

// app.post("/student/login", (req, res) => {
//   // console.log(users[0]);
//   const { aadhar, password } = req.body;
//   const user = users.find((u) => {
//     return u.aadhar === aadhar && u.password === password;
//   });
//   if (user) {
//     // Genereating an access toking using jwt!
//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);
//     refreshTokens.push(refreshToken);

//     res.json({
//       username: user.aadhar,
//       isAdmin: user.isAdmin,
//       id: user.id,
//       accessToken,
//     });
//   } else {
//     res.status(400).json("User with this aadhar-password not found!");
//   }
// });

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authe
// }

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
