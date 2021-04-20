require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require('passport');

// my routes
const contributorRoutes =require('./routes/HomePage/contributor');
const homecardRoutes= require('./routes/HomePage/homecard');
const eventRoutes= require('./routes/HomePage/event');
const WorkshopRoutes= require('./routes/HomePage/workshop');
const projectcardRoutes = require('./routes/ProjectNotes/projectcard');
const tutorialRoutes = require('./routes/Tutorials/tutorial');
const userRoutes = require('./routes/Users/user');

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded({ extended: false }));
mongoose.Promise = global.Promise;

app.use(passport.initialize());

//My Routes
app.use("/user",userRoutes);
app.use("/api",contributorRoutes);
app.use("/api",homecardRoutes);
app.use("/api",eventRoutes);
app.use("/api",WorkshopRoutes);
app.use("/api",projectcardRoutes);
app.use("/api",tutorialRoutes);

app.use("/",(req,res)=>{
  res.send("Welcome to FreeOSenior");
})

const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});