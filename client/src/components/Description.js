import React from 'react';
import PropTypes from 'prop-types';
import './Description.css';

function Description({ description }) {
  return <p className="description">{description}</p>;
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
