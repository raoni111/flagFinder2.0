import React, { useEffect, useState } from 'react';
import '../assets/scss/style-header-content.scss';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';

interface Props {
  lightMode: boolean;
  setLightModeFunction(): void;
}

export default function HeaderComponent(props: Props): JSX.Element {
  const [lightMode, setLightMode] = useState(props.lightMode);

  useEffect(() => {
    setLightMode(props.lightMode);
  }, [props.lightMode]);

  return (
    <header className="header-content" light-mode={`${lightMode}`}>
      <div className="title-content">
        <h1>Where in the World?</h1>
      </div>
      <div className="mode-content">
        <button className="mode-button" onClick={props.setLightModeFunction}>
          <span>
            {lightMode ? (
              <BsMoonStarsFill className="mode-icon" />
            ) : (
              <BsFillSunFill className="mode-icon" />
            )}
          </span>
          {lightMode ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
}
