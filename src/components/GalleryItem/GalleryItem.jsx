import React from 'react';

import PropTypes from 'prop-types';
import s from './GalleryItem.module.css';

const GalleryItem = ({ id, webformatURL, alt, onClick }) => {
  return (
    <li onClick={onClick}>
      <img
        id={id}
        src={webformatURL}
        alt={alt}
        className={s.galleryItemImage}
      />
    </li>
  );
};
export default GalleryItem;

GalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string,
  }),
};
