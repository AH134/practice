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

const CountryList = (props) => {
  const { filteredCountries, handelOnShow } = props;
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

const CountryInformation = (props) => {
  const { filteredCountries, temp, icon, windSpeed } = props;
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
      <h1>Weather in {country.capital}</h1>
      <p>temperature {temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather-icon"
      />
      <p>wind {windSpeed} m/s</p>
    </div>
  );
};

const DisplayCountry = (props) => {
  const { filteredCountries, handelOnShow, temp, icon, windSpeed } = props;

  if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <CountryList
        filteredCountries={filteredCountries}
        handelOnShow={handelOnShow}
      />
    );
  } else if (filteredCountries.length == 1) {
    return (
      <CountryInformation
        filteredCountries={filteredCountries}
        temp={temp}
        icon={icon}
        windSpeed={windSpeed}
      />
    );
  }
};

const App = () => {
  const [searchedCountry, setSearchedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [weatherTemp, setWeatherTemp] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherWindSpeed, setWeatherWindSpeed] = useState(0);

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
      setCountries(res.data);
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
    const countryCapital =
      filteredCountries[0] !== undefined
        ? filteredCountries[0].capital[0]
        : null;

    if (countryCapital !== null) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryCapital}&units=metric&appid=${
            import.meta.env.VITE_OPEN_WEATHER_API_KEY
          }`
        )
        .then((res) => {
          return res.data;
        })
        .then((weatherData) => {
          setWeatherIcon(weatherData.weather[0].icon);
          setWeatherTemp(weatherData.main.temp);
          setWeatherWindSpeed(weatherData.wind.speed);
        });
    }
  }, [filteredCountries.length == 1]);

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
        temp={weatherTemp}
        icon={weatherIcon}
        windSpeed={weatherWindSpeed}
      />
    </div>
  );
};

export default App;
