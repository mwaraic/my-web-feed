import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Container } from "react-bootstrap"
import NavBar from "../NavBar"


export default function NavPrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
      <>
    <NavBar user={currentUser}/>
    
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