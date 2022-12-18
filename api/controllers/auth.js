import User from "../models/User.js";
import bycrypt from 'bcryptjs';
import { createError } from "../utils/error.js";

export const register=async(req,res,next)=>{
   try{
      const salt=bycrypt.genSaltSync(10);
      const hash=bycrypt.hashSync(req.body.password,salt);

      const newUser=new User({
         username:req.body.username,
         email:req.body.email,
         password:hash,
      })
      await newUser.save();
      res.status(201).json({success:true,user:newUser})
   }
   catch(err){
      next(err);
   }
}

export const login=async(req,res,next)=>{
   try{
      const user=await User.findOne({username:req.body.username});
      if(!user) return next(createError(400,'User not found'));

      const isPasswordCorrect=await bycrypt.compare(req.body.password,user.password);
      if(!isPasswordCorrect) return next(createError(400,'Wrong password or username'))

      const {password,isAdmin,...rest}=user._doc;
      res.status(200).json({success:true,rest})
   }
   catch(err){
      next(err);
   }
}