const express = require("express");
var cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = 8080;

//ROUTES FOR ADMIN MODULE
const Admin = require("./routes/Admin");
const User = require("./routes/User");

//Getting Models
const createTable = require("./Model");

app.use(cookieParser());

//Enable CORS
app.use(cors({ credentials: true, origin: true }));


// Serve images from the 'images' directory
app.use('/assests', express.static('assests/Docs'));
app.use('/wrong-forms', express.static('assests/WrongForms'));


app.use("/user", User);
app.use("/admin", Admin);
app.use("/logout", (req, res)=>{
  res.status(500).clearCookie("dataEntry_userToken").json({
    message: "Internal Server Error",
    error,
  });
})
app.listen(PORT, (error) => {
  try {
    if (!error) {
      console.log(
        "Server is Successfully Running, and App is listening on port : " + PORT
      );
      createTable.createTable();
    } else throw ("Error occurred, server can't start", error);
  } catch (error) {
    console.log(error);
  }
});
