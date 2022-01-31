import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';

import s from './App.module.css';
import ButtonLoadMore from '../ButtonLoadMore';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Modal from '../Modal';
import Searchbar from '../Searchbar';

const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';

class App extends Component {
  state = {
    searchString: '',
    pictures: [],
    page: 1,
    itemsPerPage: 12,
    loading: false,
    showModal: false,
    selectedFhotoUrl: '',
    error: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchString !== this.state.searchString) {
      this.setState({
        page: 1,
        itemsPerPage: 12,
        pictures: [],
        loading: true,
        error: null,
      });
      this.findImages();
    }
    if (prevState.itemsPerPage !== this.state.itemsPerPage) {
      this.setState({ loading: true, error: null });
      this.findImages();
      scroll.scrollMore(620);
    }
  }

  findImages = () => {
    const { searchString, page, itemsPerPage } = this.state;
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
        console.log(res);
        if (res.total === 0) {
          return toast.error('There are no pictures for this word', {
            theme: 'colored',
          });
        } else
          this.setState({
            pictures: res.hits.map(item => ({
              id: item.id,
              webformatURL: item.webformatURL,
              largeImageURL: item.largeImageURL,
              alt: item.tags,
            })),
          });
        return;
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchSubmit = searchString => {
    this.setState({ searchString: searchString });

    this.setState({ page: 1, itemsPerPage: 12 });
    // console.log('fotos loading');
    // console.log(searchString);
  };

  changePage = () => {
    this.setState(prevState => ({
      // page: prevState.page + 1,
      itemsPerPage: prevState.itemsPerPage + 12,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  setModalImg = largeImgUrl => {
    this.setState(() => ({
      selectedFhotoUrl: largeImgUrl,
    }));
    this.toggleModal();
  };

  render() {
    const { toggleModal, handleSearchSubmit, changePage, setModalImg } = this;
    const {
      pictures,
      loading,
      showModal,
      error,
      selectedFhotoUrl,
      itemsPerPage,
    } = this.state;

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

        {console.log(pictures.length)}

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
}

export default App;
