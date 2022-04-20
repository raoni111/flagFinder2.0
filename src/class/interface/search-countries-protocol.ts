import { Country, OptionList } from './type-country';

export default interface SearchCountriesProtocol {
  fail: boolean;
  countries: Country[];
  countryFilterByName: Country[];
  _countryFilterByReagion: Country[];

  searchCountries(): Promise<Readonly<Country[]>>;
  searchCountry(countryName: string): Readonly<Country[]>;
  searchAssist(str: string): OptionList[] | undefined;
  countriesFilterByReagion(reagionName: string): Readonly<Country[]>;
  searchByCIOC(cioc: string): string | undefined;
}
