import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { InputGroup, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  const [validated, setValidated] = useState(false);

  const onChangeEventListener = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      console.log('invalid');
    } else {
      console.log('validation passed');
      // add check email exists.
      checkEmail();
      // postRegisterData();
    }
    setValidated(true);
  };

  const checkEmail = async () => {
    fetch('/checkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: registerFormData.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.exist) {
          Swal.fire({
            icon: 'error',
            title: 'Email already used',
            text: 'This email has already been used, please log in instead!',
          });
        } else {
          postRegisterData();
        }
      })
      .catch(() => {
        console.error('Error');
      });
  };
  const postRegisterData = async () => {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          localStorage.setItem('current_user', data.user_id);
          Swal.fire({
            icon: 'success',
            title: 'Tada',
            text: 'Welcome to goalgorithm!',
          });
          history.push('/Articles');
        } else {
          console.log('Something wrong');
        }
      })
      .catch(() => {
        console.error('Error');
      });
  };

  return (
    <div className="row py-5 mt-4 align-items-center">
      <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
        <img
          src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg"
          alt=""
          className="img-fluid mb-3 d-none d-md-block"
        />
        <h1>Create an Account</h1>
      </div>

      <div className="col-md-7 col-lg-6 ml-auto">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                name="username"
                onChange={onChangeEventListener}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom02">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={onChangeEventListener}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group md="3" controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={onChangeEventListener}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button type="submit" variant="outline-success mt-3">
            Create Account
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Register;
