const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (reg,res) => {
    try{
        const reservations = await knex("Reservation")    
        .select();
        res.json(reservations);
    }catch(error){
        console.error(error);
        res.status(500).send("Something went wrong");
    }
    });


router.post("/", async (reg, res) => {
    try {
      const newReservation = reg.body;
      const reservations = await knex("Reservation")
      .insert(newReservation);
      res.status(201).json(reservations);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  });

  router.get("/:id", async(reg,res)=>{
  try{
    const reservationlId = reg.params.id
    const reservations = await knex("Reservation")
    .where("id","=", reservationlId)
    .select();
  

    if(reservations.length === 0){
      res.status(404).send("Reservation not found");
      return
    }
    res.json({ reservations });

  }catch(error){
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

router.put("/:id", async(reg,res)=>{
    try{
      const reservationlId = reg.params.id
      const updateReservation = reg.body
      const reservations = await knex("Reservation")
      .where("id","=", reservationlId)
      .update(updateReservation);
      if(reservations === 0){
        res.status(404).send("Reservation not found");
        return
      }
      res.status(200).json({ reservations });
  
    }catch(error){
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  });

  router.delete("/:id", async(reg,res)=>{
    try{
      const reservationId = reg.params.id
      const reservations = await knex("Reservation")
      .where("id","=", reservationId)
      .del();
      if(reservations === 0){
        res.status(404).send("Reservation not found");
        return
      }
      res.status(200).json({ reservations });
  
    }catch(error){
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  
  });

module.exports = router;