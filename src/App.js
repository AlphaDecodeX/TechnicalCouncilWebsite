import React from "react";
import Clubs from "./components/Clubs";
import Home from './components/Home';

function App(){
  return (<>
    <Home techCouncil = {true} 
    clubName = {"Technical Council"} 
    clubDescription = {"A club that doesn't even know what it is?"}/>
  </>)
} 

export default App;