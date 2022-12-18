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
//update
router.route('/:id').put(updateUser)
//delete
router.route('/:id').delete(deleteUser)
//get
router.route('/:id').get(getUser)
//getall
router.route('/').get(getUsers)

export default router;