import React from 'react';
import './LandingPage.css';
import gif_1 from '../images/gif-1.gif';
import gif_2 from '../images/gif-2.gif';
import gif_3 from '../images/gif-3.gif';
function LandingPage() {
  return (
    <>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  Goalgorithm
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div role="main">
        <div className="welcome-area" id="welcome">
          <div className="header-text">
            <div className="container">
              <div className="row">
                <div
                  className="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12"
                  data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
                >
                  <h1 className="leading-title">
                    Welcome to <em>Goalgorithm</em>
                  </h1>
                  <p>
                    A place where you can post any algorithm/software developing
                    related topics and interact with other people.
                  </p>
                  <a href="/login" className="main-button-slider me-2">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section" id="about">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <div className="features-item">
                  <div className="features-icon">
                    <h2>Article list</h2>
                    <p>
                      Browsing all articles around our site with fast search &
                      tag filtering supported.
                    </p>
                    <a href="#articleList" className="main-button">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter bottom move 30px over 0.6s after 0.4s"
              >
                <div className="features-item">
                  <div className="features-icon">
                    <h2>Article Management</h2>
                    <p>
                      Full permission on posting, editing and deleting your
                      articles.
                    </p>
                    <a href="#articleManagement" className="main-button">
                      Discover More
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
                data-scroll-reveal="enter right move 30px over 0.6s after 0.4s"
              >
                <div className="features-item">
                  <div className="features-icon">
                    <h2>❤️ an Article </h2>
                    <p>Upvote any articles, you can always change your mind.</p>
                    <a href="#upvote" className="main-button">
                      More Detail
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section technologies" id="articleList">
          <div className="container">
            <div className="row">
              <div
                className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <img
                  src={gif_3}
                  className=" rounded img-fluid border-dark gif-1"
                  alt="App"
                />
              </div>
              <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12">
                <div className="text ">
                  <h2>Use filters in Article List</h2>
                  <p>
                    Click one or more category tags to filter or search with any
                    keyword you are interested in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section technologies" id="articleManagement">
          <div className="container">
            <div className="row">
              <div
                className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <img
                  src={gif_2}
                  className=" rounded img-fluid border-dark gif-1"
                  alt="App"
                />
              </div>
              <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12">
                <div className="text ">
                  <h2>Manage your articles</h2>
                  <p>Update an artile or delete unwanted articles.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section technologies" id="upvote">
          <div className="container">
            <div className="row">
              <div
                className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <img
                  src={gif_1}
                  className=" rounded img-fluid border-dark gif-1"
                  alt="App"
                />
              </div>
              <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12">
                <div className="text ">
                  <h2>❤️ an Article</h2>
                  <p>Like/unlike any article at any time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer id="footer">
        <div className="container">
          <div className="footer-content">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12"></div>

              <div className="right-content col-lg-6 col-md-12 col-sm-12">
                <h2 className="leading-footer">
                  More About <em>Goalgorithm</em>
                </h2>
                <p>
                  Goalgorithm is devoted to creating a place where people can
                  share technical insights and learn about algorithms.
                  <br />
                  <br />
                  It's still under improvements, all suggestions are welcomed!
                  If you need to contact us, you can find us in the footer.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="sub-footer">
                <p>
                  Copyright &copy; 2021 Goalgorithm | Designed by{' '}
                  <a rel="nofollow" href="https://chris19960730.github.io./">
                    Haocheng
                  </a>
                  &
                  <a rel="nofollow" href="https://marvelousbear.github.io/">
                    Ziqi
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default LandingPage;
