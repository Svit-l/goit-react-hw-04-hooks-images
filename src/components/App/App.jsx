import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';

import s from './App.module.css';
// import fetchImages from '../../services';
import ButtonLoadMore from '../ButtonLoadMore';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Modal from '../Modal';
import ModalImg from '../ModalImg';
import Searchbar from '../Searchbar';

const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';

function App() {
  const [searchString, setSearchString] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPictures, setTotalPictures] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFhotoUrl, setSelectedFhotoUrl] = useState('');
  const [selectedPhotoTags, setselectedPhotoTags] = useState('');
  const [error, setError] = useState(null);

  const findImages = useCallback(() => {
    if (searchString === '') {
      return;
    }
    setLoading(true);
    setError(null);
    fetch(
      `https://pixabay.com/api/?q=${searchString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else setPictures([]);
        return Promise.reject(new Error('There are no pictures for this word'));
      })
      .then(res => {
        if (res.total === 0) {
          toast.error('There are no pictures for this word', {
            theme: 'colored',
          });
          setPictures([]);
          return;
        } else
          setPictures(prevPictures => {
            return page === 1 ? res.hits : [...prevPictures, ...res.hits];
          });
        page === 1 && setTotalPictures(res.totalHits);
        console.log(res);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [page, searchString]);

  useEffect(() => {
    findImages();
  }, [findImages]);

  const handleSearchSubmit = searchString => {
    setSearchString(searchString);
    setPage(1);
    // console.log('fotos loading');
    // console.log(searchString);
  };

  const changePage = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setModalImg = (largeImageURL, tags) => {
    setSelectedFhotoUrl(largeImageURL);
    setselectedPhotoTags(tags);
    toggleModal();
  };

  return (
    <div className={s.app}>
      {/* {console.log(pictures)} */}
      {showModal && (
        <>
          <Modal onClose={toggleModal}>
            <ModalImg src={selectedFhotoUrl} alt={selectedPhotoTags} />
          </Modal>
        </>
      )}
      <Searchbar propsSubmit={handleSearchSubmit} />
      {loading && <Loader />}
      {error && <h1>{error.message}</h1>}
      {pictures.length !== 0 ? (
        <ImageGallery
          items={pictures}
          onClick={(largeImageURL, tags) => {
            setModalImg(largeImageURL, tags);
          }}
        />
      ) : (
        <div className={s.string}>
          Enter keyword for search images and fhotos!
        </div>
      )}
      {/* {console.log(pictures.length)} */}
      {pictures.length > 0 && pictures.length < totalPictures && !loading && (
        <ButtonLoadMore onClick={() => changePage()} />
      )}

      {page > 1
        ? scroll.scrollMore(480)
        : window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
          })}

      <ToastContainer
        position="top-center"
        autoClose={2500}
        fontSize="12pt"
        hideProgressBar
        style={{ width: 'auto' }}
      />
    </div>
  );
}

export default App;
