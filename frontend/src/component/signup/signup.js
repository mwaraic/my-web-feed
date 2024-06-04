import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../firebase/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const TITLE = "Sign Up | My Web Feed";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    var store = require("store");
    store.set(emailRef.current.value, { user: true });
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    try {
      history("/");
    } catch {
      console.log('maaz')
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <div className="text-center" style={{ marginTop: 25 }}>
              <Button
                variant="success"
                disabled={loading}
                className="w-100"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}