import React from 'react';

import PropTypes from 'prop-types';
import s from './GalleryItem.module.css';

const GalleryItem = ({ item }) => {
  return (
    <li>
      <img
        id={item.id}
        src={item.webformatURL}
        alt={item.tags}
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
