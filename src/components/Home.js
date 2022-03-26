import React from "react";
import './styles/Home.css';
import Clubs from './Clubs';
import Events from './Events';
import Teams from './Teams';
import { useParams } from 'react-router-dom';
function Home(props){
  const { name } = useParams();
  // console.log(name)
    return <div className = "home">
      <div className = "singleClub">
      <div className = "clubHeading">
          <h1 className = "name" href = "#">
              {props.clubName}
          </h1>
          <p className = "description">
              {props.clubDescription}
          </p>
      </div>
    </div>

    {props.techCouncil ? <Clubs/> : null}

    <Events/>

    <Teams/>



  </div>
}

export default Home;