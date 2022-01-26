import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './App.module.css';
import ButtonLoadMore from '../ButtonLoadMore';
import GalleryItem from '../GalleryItem';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
// import Modal from '../Modal';
import Searchbar from '../Searchbar';

// API key: 24539365-a9ec93e41963d169f0a4900c0
// Retrieving photos of "yellow flowers". The search term q needs to be URL encoded:
// https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

console.log(
  'https://pixabay.com/api/?key=24539365-a9ec93e41963d169f0a4900c0&q=yellow+flowers&image_type=photo',
  'https://pixabay.com/api/?q=cat&page=1&key=24539365-a9ec93e41963d169f0a4900c0&image_type=photo&orientation=horizontal&per_page=12'
);

// const API_KEY = '24539365-a9ec93e41963d169f0a4900c0';

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    loading: false,
  };

  addFotos = searchString => {
    console.log('fotos loading');
    console.log(searchString);
  };

  render() {
    const { addFotos } = this;
    const { pictures, page, loading } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={addFotos} />
        <ImageGallery items={pictures} />

        <ButtonLoadMore />
        {loading && <Loader />}

        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;
