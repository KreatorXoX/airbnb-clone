"use client";

import useCountries, { Country } from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

type Props = {
  value: Country | null | undefined;
  onChange: (country: Country) => void;
};
export default function CountrySelectInput({ value, onChange }: Props) {
  const { getCountries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        maxMenuHeight={130}
        isSearchable
        hideSelectedOptions
        options={getCountries()}
        value={value}
        onChange={(value) => onChange(value as Country)}
        formatOptionLabel={(option: any) => {
          return (
            <div className="flex items-center gap-3">
              <div>{option.countryFlag}</div>
              <div className="truncate">{option.label}</div>
              <div className="text-xs flex items-center gap-1 text-neutral-500 whitespace-nowrap">
                <span>{option.countryRegion},</span>

                <span>{option.countrySubregion}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-2",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
