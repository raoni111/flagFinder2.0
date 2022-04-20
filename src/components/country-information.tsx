/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import '../assets/scss/style-country-information.scss';
import formatNumberOfPeople from '../assets/utils/formatNumberOfPeople';
import SearchCountriesProtocol from '../class/interface/search-countries-protocol';
import { Country } from '../class/interface/type-country';
import { BiArrowBack } from 'react-icons/bi';

interface Props {
  displayCountryInfo: boolean;
  displayCountryInfoFunction(
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void;
  country: Country | undefined;
  searchCoutries: SearchCountriesProtocol;
}

export default function CountryInformation(props: Props): JSX.Element {
  const [displayCountryInfo, setDisplayCountryInfo] = useState<boolean>();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    setDisplayCountryInfo(props.displayCountryInfo);
  }, [props.displayCountryInfo]);

  useEffect(() => {
    setCountry(props.country);
  }, [props.country]);

  const displayKeysTheCurrencies = () => {
    if (country?.currencies) {
      const currencies = Object.keys(country?.currencies);
      return currencies.toString().replace(',', ', ');
    }
    return '';
  };
  const displayKeysTheLanguage = () => {
    if (country?.languages) {
      const currencies = Object.keys(country?.languages);
      return currencies.toString().replace(',', ', ');
    }
    return '';
  };

  const displayBorderCountries = (border: string[] | undefined): string[] => {
    console.log(border);
    const borderCountries: string[] = [];
    border?.map((cioc) => {
      const borderCountriesSearch = props.searchCoutries.searchByCIOC(cioc);
      if (typeof borderCountriesSearch === 'string') {
        borderCountries.push(borderCountriesSearch);
      }
    });
    console.log(borderCountries);
    return borderCountries;
  };

  return (
    <div
      className="country-information-element"
      id={`display-${displayCountryInfo}`}
    >
      <button onClick={(e) => props.displayCountryInfoFunction(e)}>
        <BiArrowBack size="20" className="icon-content" />
        Back
      </button>
      <div className="country-information-content">
        <div className="country-flag-content">
          <img src={country?.flags.svg} alt={country?.name.common} />
        </div>
        <div className="inforamtions-content">
          <h1>{country?.name.common}</h1>
          <ul className="country-information-ul">
            <li className="information-li">
              Native Name: <span>{country?.name.official}</span>
            </li>
            <li className="information-li">
              Population:{' '}
              <span>{formatNumberOfPeople(country?.population)}</span>
            </li>
            <li className="information-li">
              Region: <span>{country?.region}</span>
            </li>
            <li className="information-li">
              Sub Region: <span>{country?.subregion}</span>
            </li>
            <li className="information-li">
              Capital: <span>{country?.capital}</span>
            </li>
            <li className="information-li">
              Currencies: <span>{displayKeysTheCurrencies()}</span>
            </li>
            <li className="information-li">
              Languages: <span>{displayKeysTheLanguage()}</span>
            </li>
          </ul>
          <div className="border-country-content">
            <h4>Border Countries:</h4>
            <ul className="border-country-ul">
              {country?.borders ? (
                displayBorderCountries(country?.borders).length > 0 ? (
                  displayBorderCountries(country?.borders).map(
                    (countryName) => {
                      return (
                        <li className="border-country-li">{countryName}</li>
                      );
                    },
                  )
                ) : (
                  <li className="border-country-li">country not found</li>
                )
              ) : (
                <li className="border-country-li">country not found</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
