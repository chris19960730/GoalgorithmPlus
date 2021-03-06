import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import logo from '../images/logo.png';
import './Register.css';

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
    console.log('clicked');
    if (form.checkValidity() === false) {
      console.log('invalid');
    } else {
      console.log('validation passed');
      checkEmail();
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
    <div role="main">
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <h1>
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid mb-3 d-none d-md-block"
                />
              </a>
            </h1>
          </div>

          <div className="col-md-7 col-lg-6 ml-auto">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-4">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    required
                    onChange={onChangeEventListener}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    required
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={onChangeEventListener}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address
                  </Form.Control.Feedback>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="form4Example1"
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={onChangeEventListener}
                  />
                </div>

                <div className="form-group col-lg-12 mx-auto mb-0 register-btn">
                  <button
                    type="submit"
                    className="btn btn-block py-2 text-white"
                  >
                    <span className="font-weight-bold ">
                      Create your account
                    </span>
                  </button>
                </div>

                <div className="text-center w-100">
                  <p className="text font-weight-bold mt-5 me-3">
                    Already Registered?{' '}
                    <a href="/login" className="ml-2 login-link">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
