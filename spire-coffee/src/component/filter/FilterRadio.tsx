import { Level, LevelLabel, RadioAttribute, SortLabel, SortOption } from "@/config/FilterItems";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterAccordion from "./FilterAccordion";

type FilterRadioProps<T> = {
  type: RadioAttribute;
  title: string;
  value: Level | SortOption | undefined;
  setValue: (value: Level | SortOption | undefined) => void;
};

const FilterRadio = <T extends RadioAttribute>({
  type,
  title,
  value,
  setValue,
}: FilterRadioProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;

    // Set the value correctly based on the type
    if (type === RadioAttribute.NOISE || type === RadioAttribute.CAPACITY) {
      setValue(selectedValue as Level);
    } else {
      setValue(selectedValue as SortOption);
    }

    // Update search params
    if (selectedValue) {
      searchParams.set(type, selectedValue);
    } else {
      searchParams.delete(type);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const paramValue = searchParams.get(type);

    if (paramValue) {
      // Set the value based on the type when reading from search params
      if (type === RadioAttribute.NOISE || type === RadioAttribute.CAPACITY) {
        setValue(paramValue as Level | undefined);
      } else {
        setValue(paramValue as SortOption);
      }
    }
  }, [searchParams, type, setValue]);

  const renderRadioButtons = () => {
    if (type === RadioAttribute.NOISE || type === RadioAttribute.CAPACITY) {
      return (
        <React.Fragment>
          <FormControlLabel
            value={Level.LOW}
            control={<Radio />}
            label={LevelLabel.LOW}
          />
          <FormControlLabel
            value={Level.MEDIUM}
            control={<Radio />}
            label={LevelLabel.MEDIUM}
          />
          <FormControlLabel
            value={Level.HIGH}
            control={<Radio />}
            label={LevelLabel.HIGH}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <FormControlLabel
            value={SortOption.NOISE_LOW}
            control={<Radio />}
            label={SortOption.NOISE_LOW}
          />
          <FormControlLabel
            value={SortOption.NOISE_HIGH}
            control={<Radio />}
            label={SortOption.NOISE_HIGH}
          />
          <FormControlLabel
            value={SortOption.CAPACITY_LOW}
            control={<Radio />}
            label={SortLabel.CAPACITY_LOW}
          />
          <FormControlLabel
            value={SortOption.CAPACITY_HIGH}
            control={<Radio />}
            label={SortLabel.CAPACITY_HIGH}
          />
          <FormControlLabel
            value={SortOption.PRICE_LOW}
            control={<Radio />}
            label={SortLabel.PRICE_LOW}
          />
          <FormControlLabel
            value={SortOption.PRICE_HIGH}
            control={<Radio />}
            label={SortLabel.PRICE_HIGH}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <FilterAccordion title={title}>
      <FormControl>
        <RadioGroup value={value ? value : ""} onChange={handleRadioChange}>
          {renderRadioButtons()}
        </RadioGroup>
      </FormControl>
    </FilterAccordion>
  );
};

export default FilterRadio;
