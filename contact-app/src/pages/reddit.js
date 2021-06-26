import React, {useState, useEffect} from 'react';
import { Card,Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading'; 
import { useAuth } from "../contexts/AuthContext"

const Reddit=({match})=>{
    const { currentUser } = useAuth()
    const { promiseInProgress } = usePromiseTracker();
    const userid= match.params.name;
    const [twitter, setTwitter]= useState([]) 
    
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/reddit/${userid}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        trackPromise(
            fetchData());
    },[userid]);

    return(
    <>
    
    <Container>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'20%'} width={'20%'} />}
    {twitter.map(d=>   
    <Card>
        {currentUser.email}
        <Card.Body><Card.Title>{d.subreddit_name_prefixed}</Card.Title>
           <h4><a href={d.url}>{d.title}</a></h4> 
            <p>{d.selftext}</p>
            
        </Card.Body>
    </Card>)}
   
    </Container>
    </>)
}

export default Reddit;
