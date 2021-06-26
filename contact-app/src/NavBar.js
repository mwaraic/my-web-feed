import React from 'react';
import {Col,Row,Navbar} from 'react-bootstrap';
const NavBar =() => (
<>
   <Navbar bg="success" expand="lg" variant="success">
   <Navbar.Brand style={{color: "white"}} ><img  style={{ height : 50, width: 52, marginLeft: 5 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png" alt=""/></Navbar.Brand>
  
  </Navbar>
 
  <Row>
    <Col className="text-center" style={{minWidth: 10, backgroundColor :"black", color: "white"}}><a href="/news/pakistan"><img  style={{ height : 55, width: 50, }} src="https://www.tenforums.com/geek/gars/images/2/types/thumb_news_and_interests.png" alt=""/></a></Col>
    <Col className="text-center"style={{ minWidth: 10,backgroundColor :"#00acee"}}><a href="/tweets/389313566"><img  style={{ height : 50, width: 50, }} src="https://www.chalearning.ca/wp-content/uploads/2021/03/pnglot.com-twitter-bird-logo-png-139932.png" alt=""/></a></Col>
    <Col className="text-center"style={{ minWidth: 10,backgroundColor :"#FF3F18", color: "white"}}><a href="/reddit/pakistan"><img  style={{ height : 50, width: 50, }} src="https://www.sportico.com/wp-content/uploads/2019/10/reddit-1.png" alt=""/></a></Col>
  </Row>
  
</>
);

export default NavBar;