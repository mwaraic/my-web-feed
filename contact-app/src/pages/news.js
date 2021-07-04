import React, {useState, useEffect} from 'react';
import {Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
import Gnews from '../component/gnews';
import { useAuth } from "../contexts/AuthContext"
const News=()=>{
    const { promiseInProgress } = usePromiseTracker();
    const { currentUser} = useAuth()
    const [news, setNews]= useState([]) 
   useEffect(()=>{
        
        const fetchData= async()=>{
            const result = await fetch(`/api/news/${currentUser.email}`)  
            const body= await result.json(); 
            setNews(body);  
        }
        trackPromise(
        fetchData());
        
        
    },[currentUser]);
    
    console.log(news)
  return(
    <>
   
    <Container> 
    <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
    <Gnews props={news}/>
    
    </Container>
    </>)
}

export default News;