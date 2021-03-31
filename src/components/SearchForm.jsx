import React, { useState, useEffect } from 'react';

const SearchForm = (props) => {
  const { onSubmit, onClear, text } = props;
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    onSubmit(value);
  };
  const handleClear = () => {
    setValue('');
    onClear();
  };

  useEffect(() => {
    text && setValue(text)
  }, [])

  return (
    <div className="search">
      <div className="row">
        <div className="col-12 col-md-8">
          <input type="text" onChange={handleChange} value={value} className="d-block w-100 mb-30 search__input"/>
        </div>
        <div className="col-12 col-md-2">
          <button onClick={handleSubmit} disabled={!value} className="d-block w-100 mb-30 search__button">Search</button>
        </div>
        <div className="col-12 col-md-2">
          <button onClick={handleClear} disabled={!value} className="d-block w-100 mb-30 search__button">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
