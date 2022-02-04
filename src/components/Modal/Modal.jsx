import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal(onClose) {
  // const [filtered, setFiltered] = useState('');

  // componentDidMount() {
  //   // console.log('Modal componentDidMount');
  //   window.addEventListener('keydown', this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   // console.log('Modal componentWillUnmount');
  //   window.removeEventListener('keydown', this.handleKeyDown);
  // }

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log('Press Esc');
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      // console.log('click backdrope');
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>{this.props.children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;

// propTypes = {
//     onClose: PropTypes.func.isRequired,
//   };
