import { Slider } from "@mui/material";
import FilterAccordion from "./FilterAccordion";
import { marks, valuetext } from "@/config/FilterItems";
import React, { SyntheticEvent } from "react";

type FilterSliderProps = {
  title: string;
  value: number | undefined;
  setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const FilterSlider: React.FC<FilterSliderProps> = ({
  title,
  value,
  setValue,
}) => {
  const handleSliderChange = (
    event: Event | SyntheticEvent,
    newValue: number | number[]
  ) => {
    if (typeof newValue === "number") {
      setValue(newValue as number);
    }
  };

  return (
    <FilterAccordion title={title}>
      <Slider
        aria-label="Always visible"
        step={5}
        max={30}
        marks={marks}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        value={value ?? 10}
        onChangeCommitted={handleSliderChange}
      />
    </FilterAccordion>
  );
};

export default FilterSlider;
