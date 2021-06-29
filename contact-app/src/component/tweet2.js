import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Card, Container } from 'react-bootstrap';

import moment from 'moment';

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
      return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }
const Tweet2=({props})=>{
return(
   <Container>  
   {props.sort(function(a, b) {
        var c = new Date(a.created_at);
        var d = new Date(b.created_at);
        return d-c;}).map( d=>
        <>
        <Card style={{ minWidth: '20rem', margin: 10 }}>
        <Card.Body>
            <Card.Title>{d.author_id}</Card.Title>
            <Card.Text><p><div dangerouslySetInnerHTML={{ __html: urlify(d.text)}} /></p><h6>{moment(d.created_at).fromNow()}</h6></Card.Text> 
        </Card.Body>
        </Card>
        </>
        )
        }
   
    </Container>)
}

export default Tweet2;