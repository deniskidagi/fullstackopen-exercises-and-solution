import React, { useState } from 'react';
import CountryDetails from './CountryDetails';

const SearchBar = ({countryData}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryData);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setFilteredCountries(countryData.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase())));
  };

  const handleShow = (name) => {
    setFilteredCountries(filteredCountries.filter((country) => country.name.common == name))
  }

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search countries" />
      <ul>
        {filteredCountries.slice(0, 10).map((country) => (
          <li key={country.name.common}>{country.name.common} <button onClick={() => handleShow(country.name.common)}>show</button></li>
        ))}
        {filteredCountries.length == 1 && <CountryDetails countryData={filteredCountries}/>}
      </ul>
    </div>
  );
};
export default SearchBar