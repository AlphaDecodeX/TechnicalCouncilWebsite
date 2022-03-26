import React from "react";
import TeamCard from "./TeamCard";
import clubsData from './clubsData';
import './styles/Teams.css';

function Teams(props){
    return <div>
              <div className = "teamsGrid">
                  {clubsData[0].members.map((item, index)=>(<TeamCard key = {item.ID}
                  name = {item.name} email = {item.email}
                  img = {item.img}/>))}
              </div>
           </div>
}

export default Teams;