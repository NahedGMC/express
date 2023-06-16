const express = require("express");
const router = express.Router();
const path=require('path')
//2-middleware
// const authMiddleware = (req, res, next) => {
//   const auth = true;
//   if (auth) {
//     console.log("user authorized");
//     next();
//   } else {
//     res.send("user is not authorized");
//   }
// };
const getDatemiddleware = (req, res, next) => {
  console.log("Time:", new Date())
  if ((new Date().getDay() >0 && new Date().getDay() < 6) && (new Date().getHours() >= 9 && (new Date().getHours() <= 17) )){
      console.log("app is open 🕖")
      next()
  } else {
      //console.error(err.stack);
      //res.status(500).send('Something broke ⛔!');
      console.log("app is closed ⛔")
      res.status(500).send(`We don't work Today, Have a nice day myFriend! Our web application is only available during working hours (Monday to Friday,  from 9 to 17)`)
  }
}
// 1- routes
router.get("/", getDatemiddleware, (req, res) => {
  res.sendFile(path.join(__dirname ,'../', "/public/homePage.html"));
  console.log(__dirname + "/homePage.html")
});
router.get("/contactus",getDatemiddleware, (req, res) => {
  res.sendFile(path.join(__dirname ,'../', "/public/contactus.html"));
  console.log(__dirname + "/contactus.html")
});
router.get("/ourservices",getDatemiddleware, (req, res) => {
  res.sendFile(path.join(__dirname ,'../', "/public/ourservices.html"));
  console.log(__dirname + "/ourservices.html")
});
module.exports = router;