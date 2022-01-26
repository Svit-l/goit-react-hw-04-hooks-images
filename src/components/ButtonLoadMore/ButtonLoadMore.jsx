import React from 'react';
// import PropTypes from 'prop-types';

import s from './ButtonLoadMore.module.css';

const ButtonLoadMore = () => {
  return (
    <button type="button" className={s.button}>
      Load more
    </button>
  );
};

export default ButtonLoadMore;

ButtonLoadMore.propTypes = {
  //   options: PropTypes.objectOf(PropTypes.number),
  //   onLeaveFeedback: PropTypes.func.isRequired,
};
