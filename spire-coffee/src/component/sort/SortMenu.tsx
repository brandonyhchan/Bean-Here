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
    <div>
      <FormControl sx={{ width: 200 }}>
        <Select
          multiple
          displayEmpty
          value={sortOption}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
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
    </div>
  );
};

export default SortMenu;
