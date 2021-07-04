import React from "react"
import { Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Redirect } from "react-router"
export default function DivRoute({ component: Component, ...rest }) {
const {currentUser}=useAuth()
  return (
<Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <div className="w-100" style={{ maxWidth: "400px" }}>
    <Route
    {...rest}
    render={props => {
      return !currentUser ?<Component {...props} /> : <Redirect to="/" />
    }}
  ></Route></div></Container>
  )
}