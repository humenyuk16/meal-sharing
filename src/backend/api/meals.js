const express = require("express");
const router = express.Router();
const knex = require("../database");
const app = require("../app");


router.get("/", async (req,res) => {
try{
    const meals = await knex("Meal")    
    .select();
    res.json(meals);
}catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
}
});


router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const meal = await knex("Meal")
    .insert(newMeal);
    res.status(201).json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


router.get("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const meal = await knex("Meal")
    .where("id","=", mealId)
    .select();
  

    if(meal.length === 0){
      res.status(404).send("Meal not found");
      return
    }
    res.json({ meal });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.put("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const updatedMeal = req.body
    const meal = await knex("Meal")
    .where("id","=", mealId)
    .update(updatedMeal);
    if(meal === 0){
      res.status(404).send("Meal not found");
      return
    }
    res.status(200).json({ meal });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});


router.delete("/:id", async(req,res)=>{
  try{
    const mealId = req.params.id
    const meal = await knex("Meal")
    .where("id","=", mealId)
    .del();
    if(meal === 0){
      res.status(404).send("Meal not found");
      return
    }
    res.status(200).json({ meal });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }

});

module.exports = router;
