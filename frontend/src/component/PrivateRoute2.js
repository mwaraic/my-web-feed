import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Container } from "react-bootstrap"
import NavBar2 from "../NavBar2"
import AppFooter from "../footer"

export default function PrivateRoute2({ component: Component, ...rest }) {
  
  const { currentUser } = useAuth()
  var store = require('store')
  if(currentUser != null ){
  if(store.get(currentUser.email).user===false){
    return <Redirect to="/news" />}}
  
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
   <AppFooter/>
    </>
  )
}