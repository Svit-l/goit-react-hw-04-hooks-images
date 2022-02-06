import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ propsSubmit }) {
  const [searchString, setSearchString] = useState('');

  const handleInputChange = e => {
    // console.log(e.currentTarget.value);
    const { value } = e.currentTarget;
    setSearchString(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchString.trim() === '') {
      toast.warn('Enter keyword!', {
        theme: 'colored',
      });
      return;
    }
    propsSubmit(searchString);
    setSearchString('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.formButton}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.formInput}
          value={searchString}
          onChange={handleInputChange}
          name="word"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  propsSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
