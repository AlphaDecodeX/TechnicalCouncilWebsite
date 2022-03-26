import React from "react";
import './styles/ClubCard.css';
import { useNavigate } from "react-router-dom";
const ClubCard = (props)=>{
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `clubs/${props.clubName}`; 
    navigate(path);
  }
    return<div className="card" onClick={
      routeChange
    }
      style={{cursor:'pointer'}}>
     <div className='cardsize'>
     <img className='cardimg'src={props.src} alt="clublogo"/>
     </div>
     <div className='content'>
       <h1>
       {props.clubName}
       </h1>
       <div>
        {props.clubDescription}
       </div>
       <br/>
     </div>
   </div>
   
}

export default ClubCard;