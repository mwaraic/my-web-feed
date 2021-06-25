import React, {useState, useEffect} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const Tweet=({match})=>{
    const userid= match.params.id;
    const [twitter, setTwitter]= useState([{}]) 
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/tweets/${userid}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        fetchData();
    },[userid]);
    return(
    <>
    <h1>Drake</h1>
   {twitter.map( d=> <div className="centerContent">
    <div className="selfCenter">
    <TwitterTweetEmbed tweetId={d.id} placeholder={<div />}/>
    </div>
  </div>)}
   
    
    </>)
}

export default Tweet;
