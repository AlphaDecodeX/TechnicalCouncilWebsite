import React from "react";
import ClubCard from './ClubCard';
import './styles/Clubs.css';
import clubsData from './clubsData';

function Clubs(props){
    return <div>
              <div className = "clubsGrid">
                  {clubsData.map((item, index)=>(<ClubCard key = {item.ID}
                  clubName = {item.name} clubDescription = {item.desc}
                  src = {item.img}/>))}
              </div>
           </div>
}

export default Clubs;