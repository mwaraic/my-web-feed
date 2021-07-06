import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const NotFoundPage = () => (

    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card bg="success">
    <Card.Body>
    <div style={{margin: 30}}>
    <h2 className="text-center mb-4" style={{color: "white"}} ><img  style={{ height : 55, width: 60, marginLeft: 5, marginRight: 5}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png" alt=""/>My Web Feed</h2>
     </div> 
   <h5 className="text-center mb-4" style={{color: "white"}} >403: Forbidden Access</h5>
  <h5 className="text-center mb-4" style={{color: "white"}} > <Link to="/set-preferances">Set preferances first</Link></h5>
    </Card.Body>
  </Card>      
        </div>
    </Container>
  
);

export default NotFoundPage;