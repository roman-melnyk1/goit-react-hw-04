import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      {image && (
        <div>
          <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
          <p>Автор: {image.user.name}</p>
          <p>Лайки: {image.likes}</p>
          <p>Опис: {image.description || 'Опис відсутній.'}</p>
        </div>
      )}
    </ReactModal>
  );
};

export default ImageModal;
