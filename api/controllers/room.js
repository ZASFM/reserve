import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom=async(req,res,next)=>{
   const newRoom=new Room(req.body);
   const hotelId=req.params.hotelId;
   try{
      const savedRoom=await newRoom.save();
      try{
         await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
      }  
      catch(err){
        next(err);
      }  
      res.status(200).json({success:true,room:savedRoom});
   }
   catch(err){
      next(err);
   }
}

export const updateRoom=async(req,res,next)=>{
   try{
      const updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true});
      res.status(200).json({success: true,room:updateRoom});
   }
   catch(err){
      next(err);
   }
}

export const deleteRoom=async(req,res,next)=>{
   const hotelId=req.params.hotelId;
   try{
      const deletedRoom=await Room.findByIdAndDelete(req.params.id);
      try{
         await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
      }
      catch(err){
         next(err)
      }
      res.status(200).json({success: true,room:deletedRoom});
   }
   catch(err){
      next(err);
   }
}

export const getRoom=async(req,res,next)=>{
   try{
      const room=await Room.findById(req.params.id);
      res.status(200).json({success: true,room});
   }
   catch(err){
      next(err);
   }
}

export const getRooms=async(req,res,next)=>{
   try{
      const rooms=await Room.find();
      res.status(200).json({success: true,rooms});
   }
   catch(err){
      next(err)
   }
}

export const updateRoomAvailability=async(req,res,next)=>{
   try{
      await Room.updateOne({'roomNumber._id':req.params.id},{$push:{
         'roomNumbers.$.unavailableDates':req.body.dates
      }})
      res.status(200).json({success: true});
   }
   catch(err){
      next(err);
   }
}