import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Container } from "react-bootstrap"
import NavBar2 from "../NavBar2"

export default function NavPrivateRoute2({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  
  return (
      <>
    <NavBar2/>
     
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
    <div className="w-100" style={{ maxWidth: "400px" }}>
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route></div>
   </Container>
    </>
  )
}