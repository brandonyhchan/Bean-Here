import { ExploreSortOption } from "@/config/FilterItems";
import { useGlobalStateManager } from "@/context/StateContext";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SortMenu = () => {
  const { exploreSortOption = "", setExploreSortOption } =
    useGlobalStateManager();

  const handleChange = (event: SelectChangeEvent<typeof exploreSortOption>) => {
    const {
      target: { value },
    } = event;
    setExploreSortOption(value as ExploreSortOption);
  };

  return (
    <FormControl sx={{ width: 245 }}>
      <Select
        displayEmpty
        value={exploreSortOption}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          return selected ? (
            <em>Sort by: {selected}</em>
          ) : (
            <em>Sort by: None</em>
          );
        }}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>Sort by...</em>
        </MenuItem>
        {Object.values(ExploreSortOption).map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortMenu;
