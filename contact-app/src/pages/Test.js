import React from 'react';


export default function Test({match}){
    
   return(
       <>
      <p>{match.params.id}</p> 
       </>
   )
}