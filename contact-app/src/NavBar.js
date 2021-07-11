import React, { useState } from "react"
import {ListGroup, Navbar,Nav} from 'react-bootstrap';
import { Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "react-router-dom"
import { BsFillPersonFill,BsBoxArrowInLeft} from 'react-icons/bs';
export default function NavBar() {
  const {logout } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  var store = require('store')
  async function handleLogout() {
    setError("")

    try {
      
      await logout()
      store.clearAll()
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
 
  <ListGroup horizontal>
  <ListGroup.Item action href="/news/" className="rounded-0 md-4 text-center" style={{backgroundColor :"black"}} ><img  style={{ height : 35, width: 30, }} src="https://www.tenforums.com/geek/gars/images/2/types/thumb_news_and_interests.png" alt=""/></ListGroup.Item>
  <ListGroup.Item action href="/tweets/"className="rounded-0 md-4 text-center" style={{ backgroundColor :"#00acee"}}><img  style={{ height : 30, width: 30, }} src="https://www.chalearning.ca/wp-content/uploads/2021/03/pnglot.com-twitter-bird-logo-png-139932.png" alt=""/></ListGroup.Item>
  <ListGroup.Item action href="/reddit/"className="rounded-0 md-4 text-center"style={{ backgroundColor :"#FF3F18"}}><img  style={{ height : 30, width: 30, }} src="https://www.sportico.com/wp-content/uploads/2019/10/reddit-1.png" alt=""/></ListGroup.Item>
  </ListGroup>
  {error && <Alert variant="danger">{error}</Alert>}
</>)
}