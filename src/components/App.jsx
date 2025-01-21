import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import './App.css';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [perPage, setPerPage] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  const handleQuery = ({ inputValue }) => {
    setQuery(inputValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    const getImages = async (inputValue, page, imagesValue) => {
      setIsLoading(true);

      try {
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            key: '23624617-2acc542121790b9c586bd1c21',
            q: `${inputValue}`,
            image_type: 'photo',
            orientation: 'horizontal',
            page: `${page}`,
            per_page: `${imagesValue}`,
          },
        });
        if (currentPage === 1) {
          setImages(response.data.hits);
        } else {
          setImages(prevState => [...prevState, ...response.data.hits]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      getImages(query, currentPage, perPage);
    }
  }, [currentPage, query, perPage]);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    setPerPage(12);
  }, [query]);

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleImageClick = e => {
    setIsModalOpen(true);
    setLargeImg(e.target.dataset.large);
  };

  const handleModalClose = e => {
    setIsModalOpen(false);
  };
  const handleKeyClose = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Searchbar onSubmit={handleQuery} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onClick={handleImageClick} />
      {images.length > 0 && !isLoading ? (
        <Button onClick={handleLoadMore} />
      ) : null}
      {isModalOpen && (
        <Modal
          src={largeImg}
          close={handleModalClose}
          keyClose={handleKeyClose}
        />
      )}
      {error && 'An error occurred. Please try again'}
    </div>
  );
};

export default App;
