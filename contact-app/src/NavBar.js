import React, { useState } from "react"
import {Col,Row,Navbar, NavDropdown, Nav} from 'react-bootstrap';
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "react-router-dom"
import { auth } from "./firebase"
import { BsFillPersonFill,BsBoxArrowInLeft} from 'react-icons/bs';
export default function NavBar() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")


  async function handleLogout() {
    setError("")

    try {
      
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
    return(
<>
   
   <Navbar bg="success" expand="lg" >
   <Navbar.Brand style={{color: "white", fontSize: 15}} ><img  style={{ height : 40, width: 42, marginLeft: 5, marginRight: 5 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png" alt=""/>My Web Feed</Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse className="justify-content-end">
   <Nav className="mr-auto">
   <Nav.Link style={{color: "white", fontSize: 15, marginLeft:5}} href="/"><BsFillPersonFill/> Profile</Nav.Link>
   <Nav.Link style={{color: "white", fontSize: 15, marginLeft:5}} onClick={handleLogout}> <BsBoxArrowInLeft /> Log Out</Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
  </Navbar>
 
  <Row>
    <Col className="text-center" style={{minWidth: 10, backgroundColor :"black", color: "white"}}><a href="/news/"><img  style={{ height : 45, width: 40, }} src="https://www.tenforums.com/geek/gars/images/2/types/thumb_news_and_interests.png" alt=""/></a></Col>
    <Col className="text-center"style={{ minWidth: 10,backgroundColor :"#00acee"}}><a href="/tweets/"><img  style={{ height : 40, width: 40, }} src="https://www.chalearning.ca/wp-content/uploads/2021/03/pnglot.com-twitter-bird-logo-png-139932.png" alt=""/></a></Col>
    <Col className="text-center"style={{ minWidth: 10,backgroundColor :"#FF3F18", color: "white"}}><a href="/reddit/"><img  style={{ height : 40, width: 40, }} src="https://www.sportico.com/wp-content/uploads/2019/10/reddit-1.png" alt=""/></a></Col>
  </Row>
  {error && <Alert variant="danger">{error}</Alert>}
</>)
}