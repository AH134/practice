import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ handleOnChange, searchedCountry }) => {
  return (
    <>
      <span>find countries</span>
      <input type="text" value={searchedCountry} onChange={handleOnChange} />
    </>
  );
};

const Notification = ({ countriesLength }) => {
  if (countriesLength < 10) {
    return null;
  }

  return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  );
};

const CountryList = ({ filteredCountries, toggleShow, handelOnShow }) => {
  return (
    <div>
      {filteredCountries.map((country) => (
        <div key={country.name.common}>
          <li>{country.name.common}</li>
          <button onClick={() => handelOnShow(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

const CountryInformation = ({ filteredCountries }) => {
  const country = filteredCountries[0];
  const languages = Object.keys(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <li>capital {country.capital}</li>
      <li>area {country.area}</li>

      <p>
        <b>Languages:</b>
      </p>
      <ul>
        {languages.map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        width={150}
      />
    </div>
  );
};

const DisplayCountry = ({ filteredCountries, handelOnShow }) => {
  if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <CountryList
        filteredCountries={filteredCountries}
        handelOnShow={handelOnShow}
      />
    );
  } else if (filteredCountries.length == 1) {
    return <CountryInformation filteredCountries={filteredCountries} />;
  }
};

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleOnChange = (e) => {
    setSearchedCountry(e.target.value);
  };

  const handelOnShow = (showCountry) => {
    setFilteredCountries(
      filteredCountries.filter((country) => country === showCountry)
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(countries.concat(res.data));
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      searchedCountry === ""
        ? []
        : countries.filter((country) => {
            const name = country.name.common;
            return name.toLowerCase().includes(searchedCountry);
          })
    );
  }, [searchedCountry]);

  useEffect(() => {
    axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${
        import.meta.env.VITE_OPEN_WEATHER_API_KEY
      }`
    );
  });
  return (
    <div>
      <Search
        searchedCountry={searchedCountry}
        handleOnChange={handleOnChange}
      />
      {searchedCountry !== "" ? (
        <Notification countriesLength={filteredCountries.length} />
      ) : null}

      <DisplayCountry
        filteredCountries={filteredCountries}
        handelOnShow={handelOnShow}
      />
    </div>
  );
};

export default App;
