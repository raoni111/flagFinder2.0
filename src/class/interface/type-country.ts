export type Country = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cioc: string;
  borders: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  capital: string[];
  region: string;
  subregion: string;
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  languages: {
    [key: string]: string;
  };
};

export type OptionList = {
  img: string;
  name: string;
};
