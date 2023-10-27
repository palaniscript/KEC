import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import logo from "../../assets/images/logo.png";

export default function Login() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const initialValues = {
    email: "",
    password: ""
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  let navigate = useNavigate();
  const onSubmit = (values) => {
    console.log("Values:::", values);
    axios.post(`http://localhost:3100/login`, values)
      .then(response => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        setShowSuccessMessage(true);
        setTimeout(function () { navigate(`/home`); }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        setShowErrorMessage(true);
      });
  };

  return (
    <Container className="Login-container">
      <div className="Centered-container">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Image className="Logo" src={logo} rounded />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="Enter email"
                  {...register("email", { required: "Please enter the email" })} />
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  {...register("password", { required: "Please enter the password" })} />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast show={showSuccessMessage} onClose={() => setShowSuccessMessage(false)} bg="success" delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Logged in</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast show={showErrorMessage} onClose={() => setShowErrorMessage(false)} bg="danger" delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Invalid email or password</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}