import React from "react";
import './styles/Home.css'

function Home(props){
    return <div className = "club">
    <div className = "clubHeading">
        <h1 className = "name" href = "#">
          {props.clubName}
        </h1>
        <p className = "description">
          {props.clubDescription}
        </p>
    </div>
  </div>
}

export default Home;