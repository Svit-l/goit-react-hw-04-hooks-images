import React from 'react';
// import PropTypes from 'prop-types';

import s from './ButtonLoadMore.module.css';

const ButtonLoadMore = onClick => {
  return (
    <button type="button" onClick={onClick} className={s.button}>
      Load more
    </button>
  );
};

export default ButtonLoadMore;

ButtonLoadMore.propTypes = {
  //   options: PropTypes.objectOf(PropTypes.number),
  //   onLeaveFeedback: PropTypes.func.isRequired,
};
