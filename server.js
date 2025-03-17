const express = require("express");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const Clothes = require("./models/clothes.js");
const app = express();
const methodOverride = require("method-override");
const morgan = require("morgan");


const port = process.env.PORT ? process.env.PORT : '3000';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI); //connects to MongoDB via .env file

//Import the model
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (error) => {
  console.log(`An error connectign to MOngoDB has occured ${error}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/clothes/new", (req, res) => {
  res.render("clothes/new.ejs")
});

//POST /fruits when we submit the form
app.post("/clothes", async (req, res) => {
  await Clothes.create(req.body);
  console.log(req.body);
  res.redirect("/clothes"); // redirect to index fruits
});

//GET//fruits all the clothes in the database
app.get("/clothes", async (req, res) => {
  const allClothes = await Clothes.find({});
  res.render("clothes/index.ejs", {clothes: allClothes});
});




app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

