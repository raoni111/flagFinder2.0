import axios from 'axios';
import SearchCountriesProtocol from './interface/search-countries-protocol';
import { Country, OptionList } from './interface/type-country';

export default class SearchCountries implements SearchCountriesProtocol {
  public fail = false;
  public countries: Country[] = [];
  public countryFilterByName: Country[] = [];
  public _countryFilterByReagion: Country[] = [];

  public async searchCountries(): Promise<Readonly<Country[]>> {
    await axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        this.countries = response.data;
      })
      .catch(() => {
        this.fail = true;
      });
    return this.countries;
  }

  public searchCountry(countryName: string | undefined): Readonly<Country[]> {
    const country = this.countries.filter((country: Country) => {
      for (const key in country.translations) {
        if (country.translations[key].common === countryName) {
          return country;
        }
      }
    });
    if (country[0]) {
      this.countryFilterByName = country;
      return this.countryFilterByName;
    }
    return this.countries;
  }

  public searchByCIOC(cioc: string): string | undefined {
    let countryName;
    this.countries.map((country) => {
      if (country.cioc === cioc && country.cioc !== '') {
        countryName = country.name.common;
      }
    });
    return countryName;
  }

  public searchAssist(str: string): OptionList[] | undefined {
    if (str === '') return undefined;
    const optionList: OptionList[] = [];
    const strLength = str.length;
    let cont = 0;

    this.countries.map((country) => {
      for (const key in country.translations) {
        const countryNameSlice = country.translations[key].common.slice(
          0,
          strLength,
        );
        if (cont <= 6) {
          if (str === countryNameSlice) {
            optionList.push({
              name: country.translations[key].common,
              img: country.flags.png,
            });
            cont++;
            break;
          }
        }
      }
    });
    return optionList;
  }

  countriesFilterByReagion(reagionName: string): Country[] | [] {
    if (reagionName === 'All') return this.countries;
    this._countryFilterByReagion = [];
    this.countries.filter((country) => {
      if (country.region === reagionName) {
        this._countryFilterByReagion.push(country);
      }
    });
    return this._countryFilterByReagion;
  }
}
