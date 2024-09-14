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
const queryRoutes = require('./routes/AskQuery/askquery');

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
app.use(cors());

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

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
app.use("/api",queryRoutes);

if (true) {
  app.use(express.static("client/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});