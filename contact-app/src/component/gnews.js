import React from "react";
import moment  from "moment";
import { Card} from 'react-bootstrap';
const Gnews =({props})=>(
    
    props.sort(function(a, b) {
        var c = new Date(a.pubDate);
        var d = new Date(b.pubDate);
        return d-c;}).map( d=> 
        <Card style={{ minWidth: '20rem', margin: 10 }}>
       
        <Card.Body>
          <a href={d.link}><Card.Title>{d.title}</Card.Title></a>
          <Card.Text><p>{d.subtitle}</p><h6>{moment(d.pubDate).fromNow()}</h6></Card.Text>
        </Card.Body>
      </Card>)
      
)
      


export default Gnews;