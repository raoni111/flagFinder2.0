import React from 'react';
import '../assets/scss/style-header-content.scss';

export default function HeaderComponent(): JSX.Element {
  return (
    <header className="header-content">
      <div className="title-content">
        <h1>Where in the World?</h1>
      </div>
      <div className="mode-content">
        <h1>Light Mode</h1>
      </div>
    </header>
  );
}
