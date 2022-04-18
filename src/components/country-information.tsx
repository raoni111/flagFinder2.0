import React, { useState, useEffect } from 'react';
import '../assets/scss/style-country-information.scss';

interface Props {
  displayCountryInfo: boolean;
  displayCountryInfoFunction(): void;
}

export default function CountryInformation(props: Props): JSX.Element {
  const [displayCountryInfo, setDisplayCountryInfo] = useState<boolean>();

  useEffect(() => {
    setDisplayCountryInfo(props.displayCountryInfo);
  }, [props.displayCountryInfo]);

  return (
    <div
      className="country-information-content"
      id={`display-${displayCountryInfo}`}
    >
      <button onClick={props.displayCountryInfoFunction}>Voltar</button>
    </div>
  );
}
