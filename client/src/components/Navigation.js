/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

function Navigation() {
  const history = useHistory();
  const [userName, setUserName] = useState(null);

  const handleLogOut = async () => {
    localStorage.removeItem('current_user');
    Swal.fire({
      icon: 'success',
      title: 'Goodbye~',
      text: 'See you next time!',
    });
    history.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      const getUserInfo = async () => {
        const res = await fetch('/currentUser?id=' + token);
        const currentUser = await res.json();

        setUserName(currentUser.username);
      };
      getUserInfo();
    } else {
      history.push('/login');
    }
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="/Articles">
          Goalgorithm
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/Articles"
              >
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                href="/"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More Actions
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/newArticle">
                    New Article
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/allMyArticles">
                    My Articles
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="justify-content-end">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Welcome, {userName}
                </a>
              </li>
              <li className="nav-item">
                <form onSubmit={handleLogOut}>
                  <input
                    className="btn btn-block btn-danger"
                    type="submit"
                    value="logout"
                  />
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
