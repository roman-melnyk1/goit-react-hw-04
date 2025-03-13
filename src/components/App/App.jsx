import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const API_KEY = 'WVvGIZk3Eq8MwB8PxEcJMpwSm5l3JvLgy7nV9tm_bZU';
  const BASE_URL = 'https://api.unsplash.com/search/photos';

  const fetchImages = async (query, page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(BASE_URL, {
        params: {
          query,
          page,
          client_id: API_KEY,
          per_page: 12,
        },
      });
      const newImages = response.data.results;

      if (newImages.length === 0 && page === 1) {
        toast.error('Нічого не знайдено! Спробуйте інший запит.');
        setHasMoreImages(false);
      }

      setImages(prevImages => (page === 1 ? newImages : [...prevImages, ...newImages]));
      setError(null);

      if (newImages.length < 12) {
        setHasMoreImages(false);
      } else {
        setHasMoreImages(true);
      }
      
    } catch (error) {
      setError(error.message || 'Щось пішло не так! Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = query => {
    if (query.trim() === '') {
      toast.error('Введіть ключове слово для пошуку.');
      return;
    }
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setHasMoreImages(true);
    fetchImages(query, 1);
  };

  const loadMoreImages = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchImages(searchQuery, nextPage);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && hasMoreImages && !isLoading && <LoadMoreBtn onClick={loadMoreImages} />}
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
