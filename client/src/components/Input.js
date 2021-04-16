import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({ type, name, className, placeholder, onChange }) {
  return (
    <div className="row justify-content-center">
      <input
        required
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  type: '',
  name: '',
  placeholder: '',
  className: '',
};
export default Input;
