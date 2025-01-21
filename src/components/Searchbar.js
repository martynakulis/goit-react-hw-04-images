import React from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = props => {
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchInput.value;
    props.onSubmit({ inputValue });
    form.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.formButton}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          name="searchInput"
          className={css.formInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
