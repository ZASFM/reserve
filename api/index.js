import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import hotelsRouter from './routes/hotels.js';
import roomsRouter from './routes/rooms.js';
const app=express();
dotenv.config();
mongoose.set('strictQuery', true);

const connect=async()=>{
   try{
      await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser:true,
         useUnifiedTopology:true,
      });
   }
   catch(err){
      throw err;
   }
}

mongoose.connection.on('disconnected',()=>console.log('Disconnected from MDB'))
//Middlewares:
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/users',usersRouter);
app.use('/api/hotels',hotelsRouter);
app.use('/api/rooms',roomsRouter);

app.listen(5000,()=>{
   connect();
   console.log('App is listening to port 5000');
})