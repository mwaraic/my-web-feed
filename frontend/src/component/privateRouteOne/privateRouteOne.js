import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/authContext";
import { Container } from "react-bootstrap";
import NavBar from "../navbarOne/navbarOne";
import AppFooter from "../footer/footer";

export default function PrivateRoute1({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  var store = require("store");
  if (currentUser != null) {
    if (store.get(currentUser.email).user === true) {
      return <Navigate to="/set/" />;
    }
  }

  return currentUser ? (
    <>
      <NavBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Outlet
            {...rest}
            render={(props) => {
              return (
                <Component {...props} />
              )
            }}
          ></Outlet>
        </div>
      </Container>

      <AppFooter />
    </>
  ):(
    <Navigate to="/login" />
  );
}
