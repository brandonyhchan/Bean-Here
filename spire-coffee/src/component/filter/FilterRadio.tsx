import { Level, LevelLabel } from "@/config/FilterItems";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterAccordion from "./FilterAccordion";

type FilterRadioProps = {
  title: string;
  value: Level | null;
  setValue: React.Dispatch<React.SetStateAction<Level | null>>;
};

const FilterRadio: React.FC<FilterRadioProps> = ({
  title,
  value,
  setValue,
}: FilterRadioProps) => {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as Level);
  };

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
