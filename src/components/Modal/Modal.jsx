import React from 'react';

// import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = () => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  // options: PropTypes.objectOf(PropTypes.number),
  // onLeaveFeedback: PropTypes.func.isRequired,
};
