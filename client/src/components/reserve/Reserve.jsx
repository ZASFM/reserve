import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import './reserve.css';
import useFetch from "../../hooks/useFetch";
import { useSearchProvider } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve=({setOpen,hotelId})=>{
   const {selectedRooms,setSelectedRooms}=useState([]);
   const {data,loading,error}=useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`);
   const {dates}=useSearchProvider();

   const handleChange=(e)=>{
      const value=e.target.value;
      const checked=e.target.checked;
      setSelectedRooms(preVal=>checked?[...preVal,value]:preVal.filter(item=>item!==value));
   }


   const datesInRange=(start,end)=>{
      const s=new Date(start);
      const e=new Date(end);
      const dates=[];
      const date=new Date(s.getTime());
      while(date<=e){
         dates.push(new Date(date).getTime());
         date.setDate(data.getDate()+1);
      }
      return dates;
   }

   const allDates=datesInRange(dates[0].startDate,dates[1].endDate);
   const isAvailable=(roomNumber)=>{
      const isFound=roomNumber.unavailableDates.some(date=>{
         return allDates.includes(new Date(date.getTime()));
      })
      return !isFound;
   }

   const navigate=useNavigate();
   const handleClick=async()=>{
      try{
         await Promise.all(selectedRooms.map(roomId=>{
            const res=axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`,{
               dates:allDates,
            });
            return res.data;
         }))
         setOpen(false);
         navigate('/');
      }
      catch(err){

      }
   }

   return (
      <div className="reserve">
         <div className="rContainer">
            <FontAwesomeIcon
               icon={faCircleXmark}
               onClick={()=>setOpen(false)}
               className="rClose"
            />
            <span>Select your rooms:</span>
            {data.map(room=>{
               return (
                  <div className="rItem">
                     <div className="rInfo">
                        <div className="rTitle">{room.title}</div>
                        <div className="rDescription">{room.description}</div>
                        <div className="rMax">Max peoples:{room.maxPeople}</div>
                        <div className="rPrice">Price:{room.price}</div>
                     </div>
                     {room.roomNumbers.map(roomNumber=>{
                        return (
                           <div className="room">
                              <label>{roomNumber.number}</label>
                              <input type="checkbox" value={roomNumber._id} onChange={handleChange} disabled={!isAvailable(roomNumber)}/>
                           </div>
                        )
                     })}
                  </div>
               )
            })}
         </div>
         <button onClick={handleClick} >Reserve now!</button>
      </div>
   )
}

export default Reserve;