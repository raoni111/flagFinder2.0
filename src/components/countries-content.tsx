import React, { useState, useEffect } from 'react';
import '../assets/scss/style-countries-content.scss';
import formatNumberOfPeople from '../assets/utils/formatNumberOfPeople';
import SearchCountriesProtocol from '../class/interface/search-countries-protocol';
import { Country } from '../class/interface/type-country';
import CountryInformation from './country-information';

interface Props {
  countries: Readonly<Country[]> | undefined;
  searchCountries: SearchCountriesProtocol;
  lightMode: boolean;
}

export default function CountriesContent(props: Props): JSX.Element {
  const [countries, setCountries] = useState<Readonly<Country[]> | undefined>();
  const [displayCountryInfo, setDisplayCountryInfo] = useState<boolean>(false);
  const [country, setcountry] = useState<Country>();
  const [lightMode, setLightMode] = useState(props.lightMode);

  useEffect(() => {
    setLightMode(props.lightMode);
  }, [props.lightMode]);

  useEffect(() => {
    setCountries(props.countries);
  }, [props.countries]);

  const displayCountryInfoFunction = (): void => {
    setDisplayCountryInfo(!displayCountryInfo);
    if (!displayCountryInfo) {
      document.documentElement.style.overflow = 'hidden';
      return;
    }
    document.documentElement.style.overflow = 'auto';
  };

  const setCountryFunction = (index: number) => {
    if (countries) setcountry(countries[index]);
  };
  return (
    <div
      className="contry-content"
      id={countries?.length === 1 ? 'one-content' : ''}
      light-mode={`${lightMode}`}
    >
      <CountryInformation
        searchCoutries={props.searchCountries}
        displayCountryInfo={displayCountryInfo}
        displayCountryInfoFunction={displayCountryInfoFunction}
        country={country}
        lightMode={lightMode}
      />
      {countries?.map((value, index) => {
        return (
          <section
            key={value.name.common}
            className="contry-card"
            id={`${index}`}
            onClick={() => {
              setCountryFunction(index);
              displayCountryInfoFunction();
            }}
          >
            <div className="contry-image-content-card">
              <img src={value.flags.png} alt={value.name.common} />
            </div>
            <div className="contry-information-content-card">
              <div className="contry-name-content-card">
                <h1>{value.name.common}</h1>
              </div>
              <ul className="contry-information-card">
                <li>
                  <h1>
                    Population:{' '}
                    <span>{formatNumberOfPeople(value.population)}</span>
                  </h1>
                </li>
                <li>
                  <h1>
                    Region: <span>{value.region}</span>
                  </h1>
                </li>
                <li>
                  <h1>
                    Capital: <span>{value.capital}</span>
                  </h1>
                </li>
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
