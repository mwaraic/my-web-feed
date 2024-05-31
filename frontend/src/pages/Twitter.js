import React, {useState, useEffect} from 'react';
import Tweet from '../component/Tweet';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet'

const TITLE= "Twitter | My Web Feed"
const Twitter=()=>{
    const { promiseInProgress } = usePromiseTracker();
    const { currentUser} = useAuth()
    const [twitter, setTwitter]= useState([]) 

    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/tweets/${currentUser.uid}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        trackPromise(
            fetchData());
    },[currentUser]);
    
       return(
    <>
    <Helmet><title>{TITLE}</title></Helmet>
    
   <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
    <Tweet props={twitter}/>
    
    </>)
}

export default Twitter;
