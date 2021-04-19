import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import './Tag.css';

function Tag({ color, tag, onClick, showToolTip }) {
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
      {showToolTip ? (
        <ReactTooltip id="tag" type="dark">
          <span>Click to filter by tag</span>
        </ReactTooltip>
      ) : null}
    </>
  );
}

Tag.propTypes = {
  color: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showToolTip: PropTypes.bool,
};

Tag.defaultProps = {
  showToolTip: true,
};

export default Tag;
