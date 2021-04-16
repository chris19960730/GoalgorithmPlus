import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import './Login.css';
import Input from './Input';

function Login() {
  const history = useHistory();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const onChangeEventListener = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      history.push('/Articles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLoginForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    postLoginData();
  };

  const postLoginData = async () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'verified') {
          Swal.fire({
            icon: 'success',
            title: 'Tada',
            text: 'Login Successfully!',
          });
          localStorage.setItem('current_user', data.user_id);
          history.push('/Articles');
        } else if (data.status === 'notMatch') {
          Swal.fire('Oops...', 'Wrong Password!', 'error');
        } else {
          Swal.fire(
            'Oops...',
            'This account does not exsit in our system!',
            'error'
          );
        }
      })
      .catch(() => {
        console.log('Something wrong');
      });
  };

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">Your Company Logo</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Log In</h2>
            </div>
            <div className="row">
              <form onSubmit={submitLoginForm} className="form-group">
                <Input
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="Email"
                  onChange={onChangeEventListener}
                />
                <Input
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  onChange={onChangeEventListener}
                />

                <div className="row justify-content-center">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn loginBtn"
                  />
                </div>
              </form>
            </div>
            <div className="row">
              <p>
                Don't have an account? <a href="/register">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
