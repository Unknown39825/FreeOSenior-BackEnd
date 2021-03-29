require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// my routes
const contributorRoutes =require('./routes/HomePage/contributor');
const homecardRoutes= require('./routes/HomePage/homecard');
const eventRoutes= require('./routes/HomePage/event');
const WorkshopRoutes= require('./routes/HomePage/workshop');
const projectcardRoutes = require('./routes/ProjectNotes/projectcard');

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

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api",contributorRoutes);
app.use("/api",homecardRoutes);
app.use("/api",eventRoutes);
app.use("/api",WorkshopRoutes);
app.use("/api",projectcardRoutes);

const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});