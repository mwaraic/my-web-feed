import React from 'react';
import {Col,Row,Navbar} from 'react-bootstrap';
const NavBar =() => (
<>
   <Navbar bg="dark" expand="lg" variant="dark">
   <Navbar.Brand>mywebfeed</Navbar.Brand>
  
  </Navbar>
 
  <Row>
    <Col className="text-center" style={{minWidth: 200, borderBottom: '2px solid black',borderRight: '2px solid black', backgroundColor :"white", color: "white"}}><a href="/news/pakistan"><img  style={{ height : 75, width: 250, }} src="https://archive.org/download/news-logo/news-logo.png" alt=""/></a></Col>
    <Col className="text-center"style={{ backgroundColor :"#00acee"}}><a href="/tweets/pakistan"><img  style={{ height : 75, width: 75, }} src="https://www.chalearning.ca/wp-content/uploads/2021/03/pnglot.com-twitter-bird-logo-png-139932.png" alt=""/></a></Col>
    <Col className="text-center"style={{ backgroundColor :"#FF3F18", color: "white"}}><a href="/reddit/pakistan"><img  style={{ height : 75, width: 75, }} src="https://www.sportico.com/wp-content/uploads/2019/10/reddit-1.png" alt=""/></a></Col>
  </Row>
  
</>
);

export default NavBar;