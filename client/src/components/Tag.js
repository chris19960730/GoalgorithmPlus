import React from 'react';
import PropTypes from 'prop-types';
import './Tag.css';

function Tag({ color, tag, onClick }) {
  const style = {
    backgroundColor: color,
  };
  return (
    <button className="tags me-1" style={style} onClick={onClick}>
      {tag}
    </button>
  );
}

Tag.propTypes = {
  color: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Tag;
