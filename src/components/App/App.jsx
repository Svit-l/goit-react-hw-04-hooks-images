import { useState, useEffect, useMemo } from 'react';

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
import Searchbar from '../Searchbar';

const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';

function App() {
  const [searchString, setSearchString] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPpage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFhotoUrl, setSelectedFhotoUrl] = useState('');
  const [error, setError] = useState(null);

  // componentDidUpdate(_, prevState) {
  //   if (prevState.searchString !== this.state.searchString) {
  //     this.setState({
  //       page: 1,
  //       itemsPerPage: 12,
  //       pictures: [],
  //       loading: true,
  //       error: null,
  //     });
  //     this.findImages();
  //     window.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: 'auto',
  //     });
  //   }
  //   if (
  //     prevState.itemsPerPage !== this.state.itemsPerPage &&
  //     prevState.searchString === this.state.searchString
  //   ) {
  //     this.setState({ loading: true, error: null });
  //     this.findImages();
  //     scroll.scrollMore(610);
  //   }
  // }

  const findImages = () => {
    fetch(
      `https://pixabay.com/api/?q=${searchString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else
          return Promise.reject(
            new Error('There are no pictures for this word')
          );
      })
      .then(res => {
        // console.log(res);
        if (res.total === 0) {
          return toast.error('There are no pictures for this word', {
            theme: 'colored',
          });
        } else
          setPictures({
            pictures: res.hits.map(item => ({
              id: item.id,
              webformatURL: item.webformatURL,
              largeImageURL: item.largeImageURL,
              alt: item.tags,
            })),
          });
        return;
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = searchString => {
    setSearchString(searchString);
    setPpage(1);
    setItemsPerPage(12);
    // console.log('fotos loading');
    // console.log(searchString);
  };

  const changePage = () => {
    setItemsPerPage(
      prevState =>
        // page: prevState.page + 1,
        prevState + itemsPerPage
    );
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const setModalImg = largeImgUrl => {
    setSelectedFhotoUrl(largeImgUrl);
    toggleModal();
  };

  return (
    <div className={s.app}>
      {showModal && (
        <>
          <Modal onClose={toggleModal}>
            <img src={selectedFhotoUrl} alt="Large fhoto" />
          </Modal>
        </>
      )}

      <Searchbar propsSubmit={handleSearchSubmit} />

      {loading && <Loader />}

      {error && <h1>{error.message}</h1>}

      {pictures.length > 0 ? (
        <ImageGallery
          items={pictures}
          onClick={largeImageURL => {
            setModalImg(largeImageURL);
          }}
        />
      ) : (
        <div className={s.string}>
          Enter keyword for search images and fhotos!
        </div>
      )}

      {/* {console.log(pictures.length)} */}

      {pictures.length > itemsPerPage - 1 && !loading && (
        <ButtonLoadMore onClick={() => changePage()} />
      )}

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
