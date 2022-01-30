import React from 'react';

import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';

const ImageGallery = ({ items }) => {
  return (
    <ul className={s.gallery}>
      {items.map(item => {
        return <GalleryItem key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
