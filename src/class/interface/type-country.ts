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
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  capital: string[];
  region: string;
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
};

export type OptionList = {
  img: string;
  name: string;
};
