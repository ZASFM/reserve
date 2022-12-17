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
router.route('/:id').delete(async(req,res)=>{
   try{
      const deletedHotel=await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json({success: true,hotel:deletedHotel});
   }
   catch(err){
      res.status(500).json({success:false,err});
   }
})
//get
router.route('/:id').get(async(req,res)=>{
   try{
      const hotel=await Hotel.findById(req.params.id);
      res.status(200).json({success: true,hotel:hotel});
   }
   catch(err){
      res.status(500).json({success:false,err});
   }
})
//getall
router.route('/').get(async(req,res)=>{
   try{
      const hotels=await Hotel.findById();
      res.status(200).json({success: true,hotel:hotels});
   }
   catch(err){
      res.status(500).json({success:false,err});
   }
})
export default router;