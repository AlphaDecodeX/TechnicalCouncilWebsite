import React from "react";
import Clubs from "./components/Clubs";
import Home from './components/Home';
import {Route,Routes} from 'react-router-dom';
import Error from './Error'
import Login from './components/Login'

function App(){
  return (<>
  
  <Routes>
    <Route exact path='/' element={
    <Home techCouncil = {true} 
    clubName = {"Technical Council"}
    clubDescription = {"A club that doesn't even know what it is?"}/>}/>
    <Route exact path='/clubs/:name' element={<Home techCouncil = {false} 
    clubName = {"Metis Club"} 
    clubDescription = {"A Coding Club"}/>}/>
    <Route exact path='/login' element={
      <Login/>
    }/>
    <Route element={Error}/>

  </Routes>
    
  </>)
} 

export default App;