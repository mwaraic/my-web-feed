import React, {useState, useEffect} from 'react';
import { Card, Container } from 'react-bootstrap';
import moment from 'moment';
const News=({match})=>{
    const name= match.params.name;
    const [news, setNews]= useState({items:[]})
    const [news1, setNews1]= useState({items:[]}) 
    useEffect(()=>{
        const fetchData= async()=>{
            const result1 = await fetch(`/api/news/australia`)  
            const body1= await result1.json(); 
            setNews1(body1);  
            const result = await fetch(`/api/news/${name}`)  
            const body= await result.json(); 
            setNews(body);  
        }
        fetchData();
    },[name]);
    
    return(
    <>
   
    <Container> 
    <h1>{name}</h1>
    {news.items.slice(0,10).concat(news1.items.slice(0,10)).sort(function(a, b) {
    var c = new Date(a.pubDate);
    var d = new Date(b.pubDate);
    return d-c;}).map( d=> 
    <Card style={{ width: '20rem', margin: 10 }}>
   
    <Card.Body>
      <a href={d.link}><Card.Title>{d.title}</Card.Title></a>
      <Card.Text><p>{d.subtitle}</p><h6>{moment(d.pubDate).fromNow()}</h6></Card.Text>
    </Card.Body>
  </Card>)}
  
    </Container>
    </>)
}

export default News;