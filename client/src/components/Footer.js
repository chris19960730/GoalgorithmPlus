import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
function Footer() {
  return (
    <div className="container">
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
  );
}

Footer.propTypes = {
  textColor: PropTypes.string,
  borderTop: PropTypes.string,
};
Footer.defaultProps = {
  textColor: '#fff',
  borderTop: ' border-top: 1px solid rgba(250, 250, 250, 0.3)',
};
export default Footer;
