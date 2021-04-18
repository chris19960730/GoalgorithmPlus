import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Tag.css';

function Tag({ color, tag, onClick }) {
  const style = {
    backgroundColor: color,
  };
  return (
    <>
      <button
        className="tags me-1"
        style={style}
        onClick={onClick}
        data-tip
        data-for="tag"
      >
        {tag}
      </button>
      <ReactTooltip id="tag" type="dark">
        <span>Click to filter by tag</span>
      </ReactTooltip>
    </>
  );
}

Tag.propTypes = {
  color: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Tag;
