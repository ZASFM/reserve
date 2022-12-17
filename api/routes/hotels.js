import express from "express";
import Hotel from "../models/Hotel.js";
const router=express.Router();

//create
router.route('/').post(async(req,res)=>{
   const newHotel=new Hotel(req.body);
   try{
      const savedHotel=newHotel.save();
      res.status(201).json({success: true,hotel:savedHotel});
   }
   catch(err){
      res.status(500).json({success:false,err});
   }
})
//update
router.route('/:id').put(async(req,res)=>{
   try{
      const updateHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true});
      res.status(200).json({success: true,hotel:updateHotel});
   }
   catch(err){
      res.status(500).json({success:false,err});
   }
})
//delete
//get
//getall
export default router;