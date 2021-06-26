import React, {useState, useEffect} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
const Tweet=({match})=>{
    const { promiseInProgress } = usePromiseTracker();
    const userid= match.params.id;
    const [twitter, setTwitter]= useState([{}]) 
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/tweets/${userid}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        trackPromise(
            fetchData());
    },[userid]);
    return(
    <>
    
    <Container>
    <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
   {twitter.map( d=> <div className="centerContent">
    <div className="selfCenter">
    <TwitterTweetEmbed tweetId={d.id} placeholder={<div />}/>
    </div>
  </div>)}
   
    </Container>
    </>)
}

export default Tweet;
