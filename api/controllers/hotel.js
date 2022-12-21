import Hotel from "../models/Hotel.js";
import Room from '../models/Room.js';

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
   const {min,max,featured}=req.query;
   try{
      //finding the hotel that is featured, has a max price lesser than max and has  amin price greater than min
      const hotels=await Hotel.find({featured:featured,cheapestPrice:{$gt:min||1, $lt:max||999}});
      res.status(200).json({success: true,hotel:hotels});
   }
   catch(err){
      next(err)
   }
}

export const countByCities=async(req,res,next)=>{
   const cities=req.query.cities.split(',');
   try{
      const list=await Promise.all(cities.map(city=>{
         return Hotel.countDocuments({city:city});
      }))
      res.status(200).json({success: true,cities:list});
   }
   catch(err){
      next(err)
   }
}

export const countByType=async(req,res,next)=>{
   try{
      const hotelCount=await Hotel.countDocuments({type:'hotel'})
      const apartmentCount=await Hotel.countDocuments({type:'apartment'})
      const resortCount=await Hotel.countDocuments({type:'resort'})
      const villaCount=await Hotel.countDocuments({type:'villa'})
      const cabinCount=await Hotel.countDocuments({type:'cabin'})

      res.status(200).json([
         {type:'hotel',count:hotelCount},
         {type:'apartment',count:apartmentCount},
         {type:'resort',count:resortCount},
         {type:'villa',count:villaCount},
         {type:'cabin',count:cabinCount},
      ])
   }
   catch(err){
      next(err);
   }
}

export const getHotelRooms=async(req,res,next)=>{
   try{
      const hotel=await Hotel.findById(req.params.id);
      const list=await Promise.all(hotel.rooms.map(room=>{
         return Room.findById(room)
      })) 
      res.status(200).json(list);
   }
   catch(err){
      next(err);
   }
}

