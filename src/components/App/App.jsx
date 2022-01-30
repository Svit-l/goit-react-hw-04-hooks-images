import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.css';
import ButtonLoadMore from '../ButtonLoadMore';
// import BtnCloseModal from '../BtnCloseModal';
// import GalleryItem from '../GalleryItem';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Modal from '../Modal';
import Searchbar from '../Searchbar';

// console.log(
//   'https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo',
//   'https://pixabay.com/api/?q=cat&page=1&key=24539365-a9ec93e41963d169f0a4900c0&image_type=photo&orientation=horizontal&per_page=12'
// );

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

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.findImages();
  // }

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

      window.scrollBy({ top: 1000, behavior: 'smooth' });
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
      .then(res =>
        this.setState({
          pictures: res.hits.map(item => ({
            id: item.id,
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
            alt: item.tags,
          })),
        })
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchSubmit = searchString => {
    this.setState({ searchString: searchString });

    this.setState({ page: 1 });
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
  // selectedFhoto = index => {
  //   this.setState({ selectedFhotoId: index });
  //   this.toggleModal();
  // };

  render() {
    const { toggleModal, handleSearchSubmit, changePage, setModalImg } = this;
    const { pictures, loading, showModal, error, selectedFhotoUrl } =
      this.state;

    return (
      <div className={s.app}>
        {showModal && (
          <>
            <Modal onClose={toggleModal}>
              {/* <BtnCloseModal onClose={toggleModal} /> */}
              {/* <button type="button" onClick={toggleModal}>
                Close Modal
              </button>
              <p>Content of modal</p>
              <img src="" alt="" /> */}
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

        {pictures.length > 0 && !loading && (
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
