import React from 'react';

// import PropTypes from 'prop-types';
import s from './GalleryItem.module.css';

const GalleryItem = item => {
  console.log(item);
  return (
    <li className={s.galleryItem}>
      <img src="" alt="" className={s.galleryItemImage} />
    </li>
  );
};
export default GalleryItem;

GalleryItem.propTypes = {
  //   options: PropTypes.objectOf(PropTypes.number),
  //   onLeaveFeedback: PropTypes.func.isRequired,
};
