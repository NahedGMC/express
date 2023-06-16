const express = require('express');
const app = express();
const userList = []; // Assuming userList is defined somewhere in your code

// Custom middleware to verify the time of the request
const getDate = (req, res, next) => {
  console.log("Time:", new Date());
  if (
    new Date().getDay() > 0 &&
    new Date().getDay() < 6 &&
    new Date().getHours() >= 9 &&
    new Date().getHours() <= 17
  ) {
    console.log("app is open 🕖");
    next();
  } else {
    console.log("app error ⛔");
    res.status(503).send("Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).");
  }
};

// Application-level middleware
app.use(express.json()); // Body parsing
app.use(getDate);

// Routes
app.get("/users", (req, res) => {
  res.json(userList);
});

app.post("/users", (req, res) => {
  const newuser = req.body;
  userList.push(newuser);
  res.json(userList);
});

app.delete("/users/:id", (req, res) => {
  const newuserlist = userList.filter(user => user.id != req.params.id);
  res.json(newuserlist);
});

app.put("/users/:id", (req, res) => {
  const newupdateuserlist = userList.map(user => user.id == req.params.id ? { ...user, ...req.body } : user);
  res.json(newupdateuserlist);
});

// Start the server
app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running on port 3000");
});
