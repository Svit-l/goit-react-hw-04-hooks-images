import { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  // static propTypes = {
  //   onSubmit: PropTypes.func.isRequired,
  // };

  state = {
    searchString: '',
  };

  handleInputChange = e => {
    // console.log(e.currentTarget.value);
    const { value } = e.currentTarget;
    this.setState({ searchString: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
  };

  render() {
    const { handleInputChange, handleSubmit } = this;
    const { searchString } = this.state;
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
}

export default Searchbar;
