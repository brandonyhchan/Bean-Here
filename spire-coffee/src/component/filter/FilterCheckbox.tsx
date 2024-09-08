import { Level, Price } from "@/config/FilterItems";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value as Level;

    setValue((prevSelected) => {
      const newSelected = event.target.checked
        ? [...prevSelected, selectedValue]
        : prevSelected.filter((value) => value !== selectedValue);

      searchParams.delete("price");
      newSelected.forEach((value) => {
        searchParams.append("price", value);
      });

      return newSelected;
    });
    setSearchParams(searchParams);
  };
  useEffect(() => {
    const paramValues = searchParams.getAll("price") as Level[];
    setValue(paramValues);
  }, [searchParams, setValue]);

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
