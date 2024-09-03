import { Level, Price } from "@/config/FilterItems";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import FilterAccordion from "./FilterAccordion";

type FilterCheckboxProps = {
  title: string;
  value: Level[];
  setValue: React.Dispatch<React.SetStateAction<Level[]>>;
};

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  title,
  value,
  setValue,
}: FilterCheckboxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Level;
    setValue((prevSelected) =>
      event.target.checked
        ? [...prevSelected, value]
        : prevSelected.filter((price) => price !== value)
    );
  };

  return (
    <FilterAccordion title={title}>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              value={Level.LOW}
              checked={value.includes(Level.LOW)}
              onChange={handleCheckboxChange}
            />
          }
          label={Price.LOW}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={Level.MEDIUM}
              checked={value.includes(Level.MEDIUM)}
              onChange={handleCheckboxChange}
            />
          }
          label={Price.MEDIUM}
        />
        <FormControlLabel
          control={
            <Checkbox
              value={Level.HIGH}
              checked={value.includes(Level.HIGH)}
              onChange={handleCheckboxChange}
            />
          }
          label={Price.HIGH}
        />
      </FormControl>
    </FilterAccordion>
  );
};

export default FilterCheckbox;
