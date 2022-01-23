import React from 'react';
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = () => {
  <header className={s.searchbar}>
    <form className={s.form}>
      <button type="submit" className={s.formButton}>
        <span className={s.buttonLabel}>Search</span>
      </button>

      <input
        className={s.formInput}
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
      />
    </form>
  </header>;
};

export { default } from './App';

Searchbar.propTypes = {
  // options: PropTypes.objectOf(PropTypes.number),
  // onLeaveFeedback: PropTypes.func.isRequired,
};
