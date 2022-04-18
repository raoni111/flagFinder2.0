/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { Country, OptionList } from './class/interface/type-country';
import SearchCountries from './class/search-countries';
import CountriesContent from './components/countries-content';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import SelectOptionOfRegion from './components/select-option-region';

const searchCountries = new SearchCountries();

function App(): JSX.Element {
  const [countries, setCountries] = useState<Readonly<Country[]> | undefined>();
  const [countryInput, setCountryInput] = useState<string>();
  const [optionList, setOptionList] = useState<OptionList[]>();
  const [reagion, setReagion] = useState<string>('Filter By Reagion');
  const [displayOptionList, setDisplayOptionList] = useState<boolean>(false);

  useEffect(() => {
    searchCountries.searchCountries().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const hundleSearchCountry = () => {
    const country = searchCountries.searchCountry(countryInput);
    setCountries(country);
  };

  const hundleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    console.log(e.code);
    if (e.code === 'Enter') {
      hundleSearchCountry();
    }
  };

  const hundleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target as HTMLInputElement;
    setCountryInput(input.value);
    searchAssit(input.value);
    setDisplayOptionList(true);
  };

  const searchAssit = (str: string) => {
    const optionList = searchCountries.searchAssist(str);
    setOptionList(optionList);
  };

  const countriesFilterByReagion = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>,
  ): void => {
    const li = e.target as HTMLElement;
    const liId = li.id;
    if (!liId) return;
    console.log('teste');
    setReagion(liId);
    const countriesFilterByRegion =
      searchCountries.countriesFilterByReagion(liId);
    setCountries(countriesFilterByRegion);
  };

  const hundleClickCountryList = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const li = e.target as HTMLLIElement;
    if (li.textContent) setCountryInput(li.textContent);
    setDisplayOptionList(false);
  };

  const hundleClick = () => {
    setDisplayOptionList(false);
  };

  return (
    <div className="App" onClick={hundleClick}>
      <header className="header-content">
        <div className="title-content">
          <h1>Where in the World?</h1>
        </div>
        <div className="mode-content">
          <h1>Light Mode</h1>
        </div>
      </header>
      <main className="body-content">
        <nav className="search-nav-content">
          <div className="search-input-content">
            <button
              type="button"
              className="search-button"
              onClick={hundleSearchCountry}
            >
              <FiSearch className="search-icon-button" size="20" />
            </button>
            <input
              className="search-input"
              type="text"
              id="search-country-input"
              value={countryInput}
              placeholder="Search for a coutry..."
              onKeyDown={(e) => hundleKeyDown(e)}
              onChange={(e) => hundleChange(e)}
              autoComplete="off"
            />
            <div
              id="option-group-countries"
              className={`display-${displayOptionList}`}
            >
              <ul className="country-list">
                {optionList?.map((option) => {
                  return (
                    <li onClick={(e) => hundleClickCountryList(e)}>
                      <img
                        className="option-image"
                        src={option.img}
                        alt={option.name}
                        width="20x"
                      />
                      <span className="option-name">{option.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <SelectOptionOfRegion
            countriesFilterByReagion={countriesFilterByReagion}
            reagion={reagion}
          />
        </nav>
        <CountriesContent countries={countries} />
      </main>
    </div>
  );
}

export default App;
