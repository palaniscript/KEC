import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const columns = [{
    dataField: "firstName",
    text: "First Name",
    sort: true
  },
  {
    dataField: "lastName",
    text: "Last Name",
    sort: true
  },
  {
    dataField: "email",
    text: "Email",
    sort: true
  },
  {
    dataField: "mobile",
    text: "Mobile",
    sort: true
  },
  {
    dataField: "remove",
    text: "Action",
    formatter: (cellContent, row) => {
      return (
        <div>
          <button
            className="btn btn-warning btn-xs"
            onClick={() => editUser(row._id)}
          >
            Edit
          </button>

          &nbsp;&nbsp;
          <button
            className="btn btn-danger btn-xs"
            onClick={() => deleteUser(row._id)}
          >
            Delete
          </button>
        </div>
      );
    },
  },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(`http://localhost:3100/users`, {
      headers:
        { 'Authorization': localStorage.getItem('accessToken') }
    }
    )
      .then(res => {
        console.log(res);
        setUsers(res.data);
      });
  }

  const deleteUser = (userId) => {
    console.log(userId);
    if (window.confirm("Are you sure want to delete the user?")) {
      axios.delete(`http://localhost:3100/users/${userId}`, {
        headers:
          { 'Authorization': localStorage.getItem('accessToken') }
      })
        .then(response => {
          console.log(response);
          setShowSuccessMessage(true);
          getUsers();
        })
        .catch(function (error) {
          console.log(error);
          setShowErrorMessage(true);
        });
    }
  };

  const editUser = (userId) => {
    console.log(userId);
    navigate(`/edit-user/${userId}`);
  };

  let navigate = useNavigate();
  const addUser = () => {
    navigate(`/add-user`);
  }

  const emptyDataMessage = () => { return 'No Data to Display'; }

  return <Container>
    <Row>
      <Col md={{ span: 8 }}>
        <h1>Manage Users</h1>
      </Col>
      <Col md={{ span: 4 }}>
        <Button color="primary" className="px-4"
          onClick={addUser}
        >
          Add New User
        </Button>
      </Col>
    </Row>
    <BootstrapTable
      bootstrap4
      keyField="_id"
      data={users}
      columns={columns}
      noDataIndication={emptyDataMessage}
      pagination={paginationFactory({ sizePerPage: 10 })}
    />


    <ToastContainer
      className="p-3"
      position="bottom-end"
      style={{ zIndex: 1 }}
    >
      <Toast show={showSuccessMessage} onClose={() => setShowSuccessMessage(false)} bg="success" delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body className="text-white">User deleted successfully!</Toast.Body>
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
        <Toast.Body className="text-white">Failed to delete the user</Toast.Body>
      </Toast>
    </ToastContainer>
  </Container>;
};

export default ManageUsers;