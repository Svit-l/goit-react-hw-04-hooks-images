import React from 'react';
// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
import s from './Button.module.css';

const Button = () => {
  return (
    <button type="button" className={s.button}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  //   options: PropTypes.objectOf(PropTypes.number),
  //   onLeaveFeedback: PropTypes.func.isRequired,
};
