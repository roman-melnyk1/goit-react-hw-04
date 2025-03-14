import React, { useEffect, useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

ReactModal.setAppElement('#root');

const ImageModal = ({ image, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (image) {
      setIsVisible(true);
    }
  }, [image]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Затримка для анімації перед закриттям
  }, [onClose]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [handleClose]);

  if (!image) return null;

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={handleClose}
      className={`${styles.modal} ${isVisible ? styles.show : styles.hide}`}
      overlayClassName={styles.overlay}
    >
      <div className={styles.imageContainer} onClick={handleClose}>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.image}
        />
        <div className={styles.details}>
          <p><strong>Автор:</strong> {image.user.name}</p>
          <p><strong>Лайки:</strong> {image.likes}</p>
          <p><strong>Опис:</strong> {image.description || 'Опис відсутній.'}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default ImageModal;
