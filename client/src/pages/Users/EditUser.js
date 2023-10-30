import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const {id} = useParams();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    userType: "admin",
    status: "active"
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    userType: "admin",
    status: "active"
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    axios.get(`http://localhost:3100/users/${id}`, {
      headers:
        { 'Authorization': localStorage.getItem('accessToken') }
    })
      .then(res => {
        console.log(res);
        setUserInfo(res.data);
        reset(res.data);
      });
  }

  const onSubmit = (values) => {
    console.log("Values:::", values);
    axios.put(`http://localhost:3100/users/${userInfo._id}`, values, {
      headers:
        { 'Authorization': localStorage.getItem('accessToken') }
    })
      .then(response => {
        console.log(response);
        setShowSuccessMessage(true);
      })
      .catch(function (error) {
        console.log(error);
        setShowErrorMessage(true);
      });
  };

  return <Container>
    <Row>
      <Col md={{ span: 8 }}>
        <h1>Edit User</h1>
      </Col>
    </Row>

    <Row>
      <Col>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name"
              {...register("firstName", { required: "Please enter the first name" })} />
            {errors.firstName && (
              <Form.Text className="text-danger">
                {errors.firstName.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name"
              {...register("lastName", { required: "Please enter the last name" })} />
            {errors.lastName && (
              <Form.Text className="text-danger">
                {errors.lastName.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter email"
              {...register("email", {
                required: "Please enter the email", pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email"
                }
              })} />
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="number" placeholder="Enter mobile no"
              {...register("mobile", {
                required: {
                  value: true,
                  message: "Please enter the mobile number"
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a valid mobile number"
                },
                minLength: {
                  value: 10,
                  message: "Please enter a valid mobile number"
                },
                maxLength: {
                  value: 10,
                  message: "Please enter a valid mobile number"
                }
              })} />
            {errors.mobile && (
              <Form.Text className="text-danger">
                {errors.mobile.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              {...register("password", {
                required: "Please enter the password",
                minLength: {
                  value: 6,
                  message: "Password should be minimum 6 characters"
                }
              })} />
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userType">
            <Form.Label>User Type</Form.Label>
            <Form.Select
              {...register("userType", { required: "Please select the user type" })}
              aria-label="User Type">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
            {errors.userType && (
              <Form.Text className="text-danger">
                {errors.userType.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="userType">
            <Form.Label>Status</Form.Label>
            &nbsp;&nbsp;&nbsp;
            <Form.Check
              {...register("status")}
              inline
              label="Active"
              name="status"
              type="radio"
              value="active"
              id={`inline-status-active`}
            />
            <Form.Check
              {...register("status")}
              inline
              label="Inactive"
              name="status"
              type="radio"
              value="inactive"
              id={`inline-status-inactive`}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
    </Row>

    <ToastContainer
      className="p-3"
      position="bottom-end"
      style={{ zIndex: 1 }}
    >
      <Toast show={showSuccessMessage} onClose={() => setShowSuccessMessage(false)} bg="success" delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">User updated successfully!</Toast.Body>
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
        <Toast.Body className="text-white">Failed to update the user</Toast.Body>
      </Toast>
    </ToastContainer>
  </Container>;
};

export default EditUser;