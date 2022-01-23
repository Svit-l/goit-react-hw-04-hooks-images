import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './Button.module.css';

const GalleryItem = () => {
  <li class={s.galleryItem}>
    <img src="" alt="" className={s.galleryItemImage} />
  </li>;
};
export default GalleryItem;

GalleryItem.propTypes = {
  //   options: PropTypes.objectOf(PropTypes.number),
  //   onLeaveFeedback: PropTypes.func.isRequired,
};
