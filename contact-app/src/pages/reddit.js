import React, {useState, useEffect} from 'react';
import { Card,Container } from 'react-bootstrap';
import { usePromiseTracker,trackPromise} from 'react-promise-tracker';
import ReactLoading from 'react-loading'; 
import { useAuth } from '../contexts/AuthContext';
/*import { useAuth } from "../contexts/AuthContext" */

const Reddit=()=>{
    /*const { currentUser } = useAuth()*/
    const { promiseInProgress } = usePromiseTracker();
    const [twitter, setTwitter]= useState([]) 
    const { currentUser} = useAuth()

    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/reddit/${currentUser.email}`)  
            const body= await result.json(); 
            setTwitter(body);  
        }
        trackPromise(
            fetchData());
    },[currentUser]);
    function urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function(url) {
          return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
      }
    return(
    <>
    
    <Container>
        <div style={{marginLeft:"50%"}}>
    {promiseInProgress && 
    <ReactLoading type={'spinningBubbles'} color={'black'} height={'50%'} width={'50%'} />}</div>
    {twitter.map(d=>   
    <Card style={{ minWidth: '20rem', margin: 10 }}>
        
        <Card.Body><Card.Title>{d.subreddit_name_prefixed}</Card.Title>
          <div className="text-center"><img width="200" height="100" src={d.thumbnail} alt="" onError={(e) => (e.target.onerror = null, e.target.src = "https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-2017-present.jpg")} />
          </div> <h4><a href={d.url}>{d.title}</a></h4> 
          <p><div dangerouslySetInnerHTML={{ __html: urlify(d.selftext)}} /></p>
           
        </Card.Body>
    </Card>)}
   
    </Container>
    </>)
}

export default Reddit;
