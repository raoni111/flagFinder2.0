/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import '../assets/scss/style-countries-content.scss';
import formatNumberOfPeople from '../assets/utils/formatNumberOfPeople';
import { Country } from '../class/interface/type-country';

interface Props {
  countries: Readonly<Country[]> | undefined;
  displayCountryInfoFunction(): void;
}

export default function CountriesContent(props: Props): JSX.Element {
  const [countries, setCountries] = useState<Readonly<Country[]> | undefined>();
  useEffect(() => {
    setCountries(props.countries);
  }, [props.countries]);
  return (
    <div
      className="contry-content"
      id={countries?.length === 1 ? 'one-content' : ''}
      onClick={props.displayCountryInfoFunction}
    >
      {countries?.map((value, index) => {
        return (
          <section
            key={value.name.common}
            className="contry-card"
            id={`${index}`}
          >
            <div className="contry-image-content">
              <img src={value.flags.png} alt={value.name.common} />
            </div>
            <div className="contry-information-content">
              <div className="contry-name-content">
                <h1>{value.name.common}</h1>
              </div>
              <ul className="contry-information">
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
