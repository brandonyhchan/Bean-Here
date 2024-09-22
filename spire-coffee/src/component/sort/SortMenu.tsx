import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const sortOptions = [
  "Alphabetical",
  "Noise",
  "Capacity"
];

const SortMenu = () => {
  const [sortOption, setSortOption] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof sortOption>) => {
    const {
      target: { value },
    } = event;
    setSortOption(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
      <FormControl sx={{ width: 180 }}>
        <Select
          displayEmpty
          value={sortOption}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {

              return <em>Sort by: {selected}</em>;
       
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Sort by: {sortOption}</em>
          </MenuItem>
          {sortOptions.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default SortMenu;
