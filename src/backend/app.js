const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");
const reviewsRouter = require("./api/reviews");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");

const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use( "/reservations",reservationsRouter);
router.use("/reviews", reviewsRouter);

app.get("/future-meals", async(reg, res) => {
  try{
    const futureMeals = await knex("Meal")
    .select()
    .where("when", ">", new Date());
    if (futureMeals.length === 0){
     res.status(404).send("No future meals found");
     return
    }
    res.status(200).json(futureMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/past-meals", async(reg,res)=>{
  try{
    const pastMeals = await knex("Meal")
    .where("when", "<", new Date())
    .select();
    if(pastMeals.length === 0){
      res.status(404).send("No past meals found");
      return
    }
    res.status(200).json(pastMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/all-meals", async(reg, res)=>{
  try{
    const allMeals = await knex("Meal")
    .select()
    .orderBy("id");
    if(allMeals.length === 0){
      res.status(404).send("No meals found");
      return
    }
    res.status(200).json(allMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("Meal")
      .select()
      .orderBy("id")
      .first();

    if (firstMeal) {
      res.status(200).json(firstMeal);
    } else {
      res.status(404).send("No meal found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


app.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex("Meal")
      .select()
      .where("id", '=', knex("Meal").max('id'));

    if (lastMeal.length > 0) {
      res.status(200).json(lastMeal);
    } else {
      res.status(404).send("No meal found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


app.get("/future-meals", async(reg, res) => {
  try{
    const futureMeals = await knex("Meal")
    .select()
    .where("when", ">", new Date());
    if (futureMeals.length === 0){
     res.status(404).send("No future meals found");
     return
    }
    res.status(200).json(futureMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/past-meals", async(reg,res)=>{
  try{
    const pastMeals = await knex("Meal")
    .where("when", "<", new Date())
    .select();
    if(pastMeals.length === 0){
      res.status(404).send("No past meals found");
      return
    }
    res.status(200).json(pastMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/all-meals", async(reg, res)=>{
  try{
    const allMeals = await knex("Meal")
    .select()
    .orderBy("id");
    if(allMeals.length === 0){
      res.status(404).send("No meals found");
      return
    }
    res.status(200).json(allMeals);
  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

app.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("Meal")
      .select()
      .orderBy("id")
      .first();

    if (firstMeal) {
      res.status(200).json(firstMeal);
    } else {
      res.status(404).send("No meal found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


app.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex("Meal")
      .select()
      .where("id", '=', knex("Meal").max('id'));

    if (lastMeal.length > 0) {
      res.status(200).json(lastMeal);
    } else {
      res.status(404).send("No meal found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
