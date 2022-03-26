import React from "react";
import './styles/TeamCard.css';

const TeamCard = (props)=>{
    return<div className="card">
     <div className='cardsize'>
     <img className='cardimg'src={props.img} alt="memImg"/>
     </div>
     <div className='content'>
       <h1>
       {props.name}
       </h1>
       <div>
        {props.email}
       </div>
       <br/>
     </div>
   </div>
   
}

export default TeamCard;