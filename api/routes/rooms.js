import express from "express";
const router=express.Router();

router.route('/').get((req,res)=>{
   console.log('rooms');
})

export default router;