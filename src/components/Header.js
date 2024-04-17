import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header>
      <h1>Comics App</h1>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search comics..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form> */}
    </header>
  );
};

export default Header;