import React from "react"
import { Route} from "react-router-dom"
import { Container } from "react-bootstrap"

export default function DivRoute({ component: Component, path: Path }) {

  return (
<Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
        <div className="w-100" style={{ maxWidth: "400px" }}>
    <Route
    path={Path} component={Component}
    ></Route></div></Container>
  )
}