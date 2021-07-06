import React, {useState, useEffect} from 'react';
import Tweet2 from '../component/tweet2';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
import { useAuth } from '../contexts/AuthContext';
// Tweet (without options)

const Tweets=()=>{
    const { promiseInProgress } = usePromiseTracker();
    const { currentUser} = useAuth()
    const [twitter, setTwitter]= useState([]) 
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/tweets/${currentUser.email}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        trackPromise(
            fetchData());
    },[currentUser]);
    console.log(twitter)
    
       return(
    <>
   <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
    <Tweet2 props={twitter}/>
    
    </>)
}

export default Tweets;