import React from "react"
import {Navbar} from 'react-bootstrap';


const NavBar2 =() => {
  
    return(
<>
   <Navbar bg="success" expand="lg" >
   <Navbar.Brand style={{color: "white"}} ><img  style={{ height : 50, width: 52, marginLeft: 5 }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png" alt=""/></Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Navbar>
  
</>)
};

export default NavBar2;