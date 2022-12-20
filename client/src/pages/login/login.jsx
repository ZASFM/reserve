import { useState } from 'react';
import { useAuthProvider } from '../../context/AuthContext';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogIn=()=>{
   const [credentials,setCredentials]=useState({
      username:undefined,
      password:undefined,
   })

   const {loading,error,dispatch}=useAuthProvider();

   const handleChange=(e)=>{
      const {value,name}=e.target;
      setCredentials(preVal=>{
         return {
            ...preVal,
            [name]:value
         }
      })
   }

   const navigate=useNavigate();
   const handleLogin=async(e)=>{
      e.preventDefault();
      dispatch({type:'LOGIN_STARTED'});
      try{
         const res=await axios.post('http://localhost:5000/api/auth/login',credentials);
         dispatch({type:'LOGIN_SUCCESS',payload:res.data});
         navigate('/');
      }
      catch(err){
         dispatch({type:'LOGIN_FAILED',payload:err.response.data})
      }
   }

   return (
      <div className='login'>
      <div className='lContainer'>
      <input type="text" placeholder='username' id="username" name="username" onChange={handleChange}/>
         <input type="text" placeholder='password' id="password" name="password" onChange={handleChange}/>
         <button className='lButton' onClick={handleLogin}>Log in </button>
         {error && <span>{error.message}</span>}
      </div>
      </div>
   )
}

export default LogIn;