import React from "react";
import './styles/Club.css';

const Club=(props)=>{
    return<div className="card">
     <div className='cardsize'>
     <img className='cardimg'src="https://students.iitgn.ac.in/codingclub/assets/images/metis-265x265.jpg" alt="clublogo"/>
     </div>
     <div className='content'>
       <h1>
       Metis
       </h1>
       <div>
       Description
       </div>
       <br/>
     </div>
   </div>
   
}

export default Club;