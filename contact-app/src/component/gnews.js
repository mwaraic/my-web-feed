import React from "react";
import moment  from "moment";
import { Card} from 'react-bootstrap';
const Gnews =({props})=>{
    try{return(
    props.sort(function(a, b) {
        var c = new Date(a.pubDate);
        var d = new Date(b.pubDate);
        return d-c;}).map( d=> 
        <Card bg="light" style={{ minWidth: '20rem', margin: 10 }}>
       
        <Card.Body>
          <a href={d.link}><Card.Title>{d.title}</Card.Title></a>
          <Card.Text><p>{d.subtitle}</p><h6>{moment(d.pubDate).fromNow()}</h6></Card.Text>
        </Card.Body>
      </Card>)
    )}catch{
      return(<h2>null</h2>)
    }
        }
      

export default Gnews;