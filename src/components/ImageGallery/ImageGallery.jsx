import React from 'react';

import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import GalleryItem from '../GalleryItem';

const ImageGallery = ({ items, onClick }) => {
  // console.log(Array.isArray(items));
  return (
    <ul className={s.gallery}>
      {items.map(({ id, largeImageURL, webformatURL, alt, tags }) => {
        return (
          <GalleryItem
            key={id}
            alt={alt}
            webformatURL={webformatURL}
            onClick={() => {
              onClick(largeImageURL, tags);
            }}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
