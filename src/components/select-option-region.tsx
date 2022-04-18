import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import '../assets/scss/style-select-option-region.scss';

interface Props {
  countriesFilterByReagion(
    e: React.MouseEvent<HTMLUListElement, MouseEvent>,
  ): void;
  reagion: string;
}

export default function SelectOptionOfRegion(props: Props): JSX.Element {
  const [reagion, setReagion] = useState<string>('Filter By Reagion');
  const [displaySelectOption, setDisplaySelectOption] =
    useState<boolean>(false);

  useEffect(() => {
    setReagion(props.reagion);
  }, [props.reagion]);

  const displaySelectOptionFunction = () => {
    setDisplaySelectOption(!displaySelectOption);
  };
  return (
    <div
      className={`select-opition-of-region-content display-${displaySelectOption}`}
      onClick={displaySelectOptionFunction}
    >
      <h3 className="reagion-name-content">
        <span className="reagion-name">{reagion}</span>
        <IoIosArrowDown className="select-icon-content" size="20" />
      </h3>
      <div className="select-opition-content">
        <ul
          className="select-opition"
          onClick={(e) => props.countriesFilterByReagion(e)}
        >
          <li id="All">All</li>
          <li id="Americas">Americas</li>
          <li id="Europe">Europe</li>
          <li id="Africa">Africa</li>
          <li id="Asia">Asia</li>
          <li id="Oceania">Oceania</li>
          <li id="Antarctic">Antarctic</li>
        </ul>
      </div>
    </div>
  );
}
