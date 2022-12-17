import express from "express";
const router=express.Router();

router.route('/').get((req,res)=>{
   console.log('Auth');
})

router.route('/register').get((req,res)=>{
   console.log('register');
})

export default router;