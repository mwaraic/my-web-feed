import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../firebase/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const TITLE = "Update Profile | My Web Feed";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, changeEmail, changePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(changeEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        var store = require("store");
        store.clearAll();
        store.set(emailRef.current.value, { user: false });
        history("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <div className="text-center" style={{ marginTop: 50 }}>
              <Button
                disabled={loading}
                variant="success"
                className="w-100"
                type="submit"
              >
                Update
              </Button>
            </div>
            <div
              className="text-center"
              style={{ marginTop: 10, marginBottom: 50 }}
            >
              <Link to="/">
                <Button className="w-100" variant="success">
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
