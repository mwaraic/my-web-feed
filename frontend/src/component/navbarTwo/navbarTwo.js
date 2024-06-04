import React from "react";
import { Navbar } from "react-bootstrap";

const NavBar2 = () => {
  return (
    <>
      <Navbar bg="success" expand="lg" className="navbar-nav mx-auto">
        <Navbar.Brand style={{ color: "white", fontSize: 15 }}>
          <img
            style={{ height: 40, width: 42, marginLeft: 5, marginRight: 5 }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Globe_icon-white.svg/1024px-Globe_icon-white.svg.png"
            alt=""
          />
          My Web Feed
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default NavBar2;
