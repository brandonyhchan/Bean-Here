import { SortOption } from '@/config/FilterItems';
import { useGlobalStateManager } from '@/context/StateContext';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SortMenu = () => {
  const {
    sortOption,
    setSortOption
  } = useGlobalStateManager();

  const handleChange = (event: SelectChangeEvent<typeof sortOption>) => {
    const {
      target: { value },
    } = event;
    setSortOption(
      value as SortOption
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
        {Object.values(SortOption).map((name) => (
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
