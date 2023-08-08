import countries from "world-countries";

export type Country = {
  value: string;
  label: string;
  countryFlag: string;
  countryLatLng: number[];
  countryRegion: string;
  countrySubregion: string;
};
const formattedCountries: Country[] = countries.map((country) => {
  return {
    value: country.cca3,
    label: country.name.common,
    countryFlag: country.flag,
    countryLatLng: country.latlng,
    countryRegion: country.region,
    countrySubregion: country.subregion,
  };
});

const useCountries = () => {
  const getCountries = () => formattedCountries;

  const getCountryByCode = (countryCode: string) => {
    return formattedCountries.find((country) => country.value === countryCode);
  };

  return {
    getCountries,
    getCountryByCode,
  };
};

export default useCountries;
