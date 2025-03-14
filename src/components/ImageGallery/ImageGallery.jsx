import React from 'react';
import ImageCard from '../ImageCard/ImageCard'
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className={styles.gallery}>
      {images.map(image => (
        <img
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
          className={styles.image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
