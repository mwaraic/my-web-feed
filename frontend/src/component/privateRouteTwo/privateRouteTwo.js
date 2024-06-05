import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../firebase/authContext";
import { Container } from "react-bootstrap";
import NavBar2 from "../navbarTwo/navbarTwo";
import AppFooter from "../footer/footer";

export default function PrivateRoute2({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  var store = require("store");
  if (currentUser != null) {
    if (store.get(currentUser.email).user === false) {
      return <Navigate to="/news" />;
    }
  }

  return currentUser ? (
    <>
      <NavBar2 />

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Outlet
            {...rest}
            render={(props) => {
              <Component {...props} />
            }}
          ></Outlet>
        </div>
      </Container>
      <AppFooter />
    </>
  ): (
    <Navigate to="/login" />
  );
}
