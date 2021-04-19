import React from 'react';
import coding from '../images/coding.png';
import './LandingPage.css';
function LandingPage() {
  return (
    <>
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  Goalgorithm Plus
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="welcome-area" id="welcome">
        <div className="header-text">
          <div className="container">
            <div className="row">
              <div
                className="left-text col-lg-6 col-md-12 col-sm-12 col-xs-12"
                data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
              >
                <h1>
                  Welcome to <em>Goalgorithm Plus</em>
                </h1>
                <p>
                  A place where you can post any angorithm/software developing
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

      <section className="section" id="about">
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
                    Browsing all articles around our site with fast search & tag
                    filtering supported.
                  </p>
                  <a href="#technologies" className="main-button">
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
                  <a href="#technologies" className="main-button">
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
                  <a href="#technologies" className="main-button">
                    More Detail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="technologies">
        <div className="container">
          <div className="row">
            <div
              className="left-image col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix-big"
              data-scroll-reveal="enter left move 30px over 0.6s after 0.4s"
            >
              <img
                src={coding}
                className="rounded img-fluid d-block mx-auto"
                alt="App"
              />
            </div>
            <div className="right-text offset-lg-1 col-lg-6 col-md-12 col-sm-12 mobile-bottom-fix">
              <ul>
                <li data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                  <div className="text">
                    <h2>Vestibulum pulvinar rhoncus</h2>
                    <p>
                      Please do not redistribute this template ZIP file for a
                      download purpose. You may{' '}
                      <a
                        rel="nofollow"
                        href="https://templatemo.com/contact"
                        target="_parent"
                      >
                        contact
                      </a>{' '}
                      us for additional licensing of our template or to get a
                      PSD file.
                    </p>
                  </div>
                </li>
                <li data-scroll-reveal="enter right move 30px over 0.6s after 0.5s">
                  <div className="text">
                    <h2>Sed blandit quam in velit</h2>
                    <p>
                      You can{' '}
                      <a
                        rel="nofollow"
                        href="https://templatemo.com/tm-540-lava-landing-page"
                      >
                        download Lava Template
                      </a>{' '}
                      from our website. Duis viverra, ipsum et scelerisque
                      placerat, orci magna consequat ligula.
                    </p>
                  </div>
                </li>
                <li data-scroll-reveal="enter right move 30px over 0.6s after 0.6s">
                  <div className="text">
                    <h2>Aenean faucibus venenatis</h2>
                    <p>
                      Phasellus in imperdiet felis, eget vestibulum nulla.
                      Aliquam nec dui nec augue maximus porta. Curabitur
                      tristique lacus.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer">
        <div className="container">
          <div className="footer-content">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12"></div>

              <div className="right-content col-lg-6 col-md-12 col-sm-12">
                <h2>
                  More About <em>Goalgorithm</em>
                </h2>
                <p>
                  Phasellus dapibus urna vel lacus accumsan, iaculis eleifend
                  leo auctor. Duis at finibus odio. Vivamus ut pharetra arcu, in
                  porta metus. Suspendisse blandit pulvinar ligula ut elementum.
                  <br />
                  If you need this contact form to send email to your inbox, you
                  may follow our page for more detail.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="sub-footer">
                <p>
                  Copyright &copy; 2021 Goalgorithm Plus | Designed by{' '}
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
