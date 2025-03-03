"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { auth, provider } from '../../utils/googleAuth';
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"
 
interface SignInFormData {
  email: string
  password: string
  rememberMe: boolean
}

const GoogleSignIn: React.FC = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [validated, _setValidated] = useState(false);
  const [error, _setError] = useState<string | null>(null);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email || '');  
       localStorage.setItem("email", data.user.email || '');  
       localStorage.setItem("name", data.user.displayName || '');
    });
  };

  useEffect(() => {
    const email = localStorage.getItem('email') || '';  
    setValue(email);
  }, []);

  const navigate = useNavigate()
    if(value){
      navigate('/dashboard')
    }
  const handleSubmit = () => {
    console.log("Submitting!!")
  }

  return (
    <Container
      fluid
      className="py-5"
      
    >
      <Row className="justify-content-center" style={{ width: "100%" }}>
        <Col xs={12} sm={10} md={8} lg={7} xl={6}>
          <Card className="shadow border-0" style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}>
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-0">Sign In</h2>
                <p className="text-muted mt-2">Sign in to your account to continue</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Button
                className="w-100 mb-4 d-flex align-items-center justify-content-center gap-2 position-relative"
                style={{
                  backgroundColor: "white",
                  color: "#757575",
                  border: "1px solid #ddd",
                  height: "46px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                }}
                onClick={handleGoogleSignIn}
              >
                <div className="position-absolute start-0 ms-3 d-flex align-items-center justify-content-center">
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span className="fw-medium">Sign in with Google</span>
              </Button>

              <div className="d-flex align-items-center mb-4">
                <hr className="flex-grow-1" />
                <span className="mx-3 text-muted">or</span>
                <hr className="flex-grow-1" />
              </div>

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-between mb-4">
                  <Form.Check
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    label="Remember me"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <a href="#" className="text-decoration-none">
                    Forgot password?
                  </a>
                </div>

                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a href="#" className="text-decoration-none">
                    Sign up
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GoogleSignIn;