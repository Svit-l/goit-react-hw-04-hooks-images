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
const itemsPerPage = 12;

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    loading: false,
    showModal: false,
    searchString: '',
    error: null,
  };

  handleSearchSubmit = searchString => {
    this.setState({ searchString: searchString });

    this.setState({ page: 1 });
    // console.log('fotos loading');
    // console.log(searchString);
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.findImages();
  // }

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.searchString !== this.state.searchString
    ) {
      this.setState({ loading: true });
      this.findImages();
    }
  }

  findImages = () => {
    const { searchString, page } = this.state;
    fetch(
      `https://pixabay.com/api/?q=${searchString}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error('There are no pictures for this word. Enter another word!')
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

  changePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, handleSearchSubmit, changePage } = this;
    const { pictures, loading, showModal, error } = this.state;

    return (
      <div className={s.app}>
        {showModal && (
          <>
            <Modal onClose={toggleModal}>
              {/* <BtnCloseModal onClose={toggleModal} /> */}
              <button type="button" onClick={toggleModal}>
                Close Modal
              </button>
              <p>Content of modal</p>
              <img src="" alt="" />
            </Modal>
          </>
        )}
        <Searchbar propsSubmit={handleSearchSubmit} />

        {pictures.length > 0 ? (
          <ImageGallery items={pictures} />
        ) : (
          <div className={s.string}>Enter keyword!</div>
        )}
        {pictures.length > 0 && !loading && (
          <ButtonLoadMore onClick={() => changePage()} />
        )}

        {loading && <Loader />}
        {error && <h1>{error.message}</h1>}
        {/* // toast.warn(
          //   'There are no pictures for this word. Enter another word!',
          //   {
          //     theme: 'colored',
          //   }
          // ) */}

        <ToastContainer
          position="top-center"
          autoClose={2500}
          fontSize="12pt"
          hideProgressBar
          style={{ width: 'auto' }}
        />
        <button type="button" onClick={toggleModal}>
          Open modal
        </button>
      </div>
    );
  }
}

export default App;
