import React from 'react';

import PropTypes from 'prop-types';
import s from './ModalImg.module.css';

const ModalImg = ({ src, alt }) => {
  return <img className={s.modalImg} src={src} alt={alt} />;
};

export default ModalImg;

ModalImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
