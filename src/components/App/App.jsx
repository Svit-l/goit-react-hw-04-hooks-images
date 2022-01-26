import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './App.module.css';
// import ButtonLoadMore from '../ButtonLoadMore';
// import BtnCloseModal from '../BtnCloseModal';
// import GalleryItem from '../GalleryItem';
// import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Modal from '../Modal';
import Searchbar from '../Searchbar';

// Retrieving photos of "yellow flowers". The search term q needs to be URL encoded:
// https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

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
    keyword: '',
  };

  componentDidMount() {
    this.findImages();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.findImages();
    }

    if (prevState.keyword !== this.state.keyword) {
      console.log(this.state.keyword);
      this.findImages();
    }
  }

  findImages = () => {
    const { keyword, page } = this.state;
    fetch(
      `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`
    )
      .then(res => res.json())
      .then(res => this.setState({ pictures: res.hits }));
  };

  changeKeyword = searchString => {
    this.setState({ keyword: searchString });
    this.setState({ page: 1 });
    // console.log('fotos loading');
    // console.log(searchString);
  };

  ChangePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, changeKeyword, ChangePage } = this;
    const { pictures, loading, showModal, page, keyword } = this.state;
    console.log(page);
    console.log(pictures);
    console.log(keyword);
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
        <Searchbar onSubmit={changeKeyword} />
        <ul className={s.gallery}>
          {pictures.map(item => {
            return (
              <li key={item.id} item={item.id}>
                <img
                  src={item.webformatURL}
                  alt={item.tags}
                  className={s.galleryItemImage}
                />
              </li>
            );
          })}
        </ul>
        {/* <ImageGallery items={pictures} /> */}
        <button type="button" onClick={() => ChangePage()}>
          Load more
        </button>
        {/* <ButtonLoadMore onClick={() => this.setState({ page: page + 1 })} /> */}

        {loading && <Loader />}

        <button type="button" onClick={toggleModal}>
          Open modal
        </button>
      </div>
    );
  }
}

export default App;
