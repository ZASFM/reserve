import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router=express.Router();

/* router.route('/checkAuthentication').get(verifyToken,(req,res,next)=>{
   res.send('Authenticated');
})

router.route('/checkuser/:id').get(verifyUser,(req,res,next)=>{
   res.send('Authenticated, you are admin');
})

router.route('/checkadmin/:id').get(verifyAdmin,(req,res,next)=>{
   res.send('Authenticated admin, you are admin');
}) */
//update, you have to be a user to be able to update delete or get your account
router.route('/:id').put(verifyUser,updateUser)
//delete
router.route('/:id').delete(verifyUser,deleteUser)
//get
router.route('/:id').get(verifyUser,getUser)
//getall, only admins can get all the users
router.route('/').get(verifyAdmin,getUsers)

export default router;