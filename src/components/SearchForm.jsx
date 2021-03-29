import React, { useState } from 'react';

const SearchForm = (props) => {
  const { onSubmit } = props;
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <div className="search">
      <div className="row">
        <div className="col-12 col-md-9">
          <input type="text" onChange={handleChange} value={value} className="d-block w-100 mb-30 search__input"/>
        </div>
        <div className="col-12 col-md-3">
          <button onClick={handleSubmit} disabled={!value} className="d-block w-100 mb-30 search__button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
