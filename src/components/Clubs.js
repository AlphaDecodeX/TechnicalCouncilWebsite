import React from "react";
import Home from './Home';
import Club from './Club';
import './styles/Clubs.css';

const clubsData = [];

function Clubs(props){
    return <div>
        <div class = "clubsGrid">
  
  <div class = "club">
    <Club/>
  </div>
    <div class = "club">
    <Club/>
  </div>
    <div class = "club">
    <Club/>
  </div>
    <div class = "club">
    <Club/>
  </div>

</div>
    </div>
}

export default Clubs;