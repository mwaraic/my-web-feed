import React, {useState, useEffect} from 'react';
import {Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
import News from '../component/News';
import { useAuth } from "../contexts/AuthContext"
import { Helmet } from 'react-helmet';
const TITLE= "News | My Web Feed"
const GoogleNews=()=>{
    const { promiseInProgress } = usePromiseTracker();
    const { currentUser} = useAuth()
    const [news, setNews]= useState([]) 
   useEffect(()=>{
        
        const fetchData= async()=>{
            const result = await fetch(`/api/news/${currentUser.uid}`)  
            const body= await result.json(); 
            setNews(body);  
        }
        trackPromise(
        fetchData());
        
        
    },[currentUser]);
    
  return(
    <>
   <Helmet><title>{TITLE}</title></Helmet>
    <Container> 
    <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
    <News props={news}/>
    
    </Container>
    </>)
}

export default GoogleNews;