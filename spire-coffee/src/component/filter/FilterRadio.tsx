import { Level, LevelLabel, RadioAttribute } from "@/config/FilterItems";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FilterAccordion from "./FilterAccordion";

type FilterRadioProps = {
  type: RadioAttribute;
  title: string;
  value: Level | undefined;
  setValue: React.Dispatch<React.SetStateAction<Level | undefined>>;
};

const FilterRadio: React.FC<FilterRadioProps> = ({
  type,
  title,
  value,
  setValue,
}: FilterRadioProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as Level;
    setValue(selectedValue);

    if (selectedValue) {
      searchParams.set(type, selectedValue);
    } else {
      searchParams.delete(type);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    const paramValue = searchParams.get(type) as Level;
    if (paramValue) {
      setValue(paramValue);
    }
  }, [searchParams, type, setValue]);

  return (
    <FilterAccordion title={title}>
      <FormControl>
        <RadioGroup value={value ? value : ""} onChange={handleRadioChange}>
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
        </RadioGroup>
      </FormControl>
    </FilterAccordion>
  );
};

export default FilterRadio;
