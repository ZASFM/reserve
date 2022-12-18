import Hotel from "../models/Hotel.js";

export const createHotel=async(req,res,next)=>{
   const newHotel=new Hotel(req.body);
   try{
      const savedHotel=newHotel.save();
      res.status(201).json({success: true,hotel:savedHotel});
   }
   catch(err){
      next(err);
   }
}

export const updateHotel=async(req,res,next)=>{
   try{
      const updateHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true,runValidators:true});
      res.status(200).json({success: true,hotel:updateHotel});
   }
   catch(err){
      next(err);
   }
}

export const deleteHotel=async(req,res,next)=>{
   try{
      const deletedHotel=await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json({success: true,hotel:deletedHotel});
   }
   catch(err){
      next(err);
   }
}

export const getHotel=async(req,res,next)=>{
   try{
      const hotel=await Hotel.findById(req.params.id);
      res.status(200).json({success: true,hotel:hotel});
   }
   catch(err){
      next(err);
   }
}

export const getHotels=async(req,res,next)=>{
   try{
      const hotels=await Hotel.find();
      res.status(200).json({success: true,hotel:hotels});
   }
   catch(err){
      next(err)
   }
}