import React, {useState, useEffect} from 'react';
import {Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading';
import Gnews from '../component/gnews';

const News=({match})=>{
    const { promiseInProgress } = usePromiseTracker();
    const name= match.params.name;
    const [news, setNews]= useState([]) 
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/news/${name}`)  
            const body= await result.json(); 
            setNews(body);  
        }
        trackPromise(
        fetchData());
    },[name]);
    
    console.log(news)
    return(
    <>
   
    <Container> 
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'25%'} width={'25%'} />}
    <Gnews props={news}/>
    
    </Container>
    </>)
}

export default News;