import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        // console.log('Press Esc');
        onClose();
      }
    };
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // console.log('Modal componentWillUnmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      // console.log('click backdrope');
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
