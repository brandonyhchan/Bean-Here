import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import mainTheme from "@/styles/mainTheme";

interface SearchBarProps {
  query: string;
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, handleQuery }) => (
  <form>
    <Container
      sx={{ display: "flex", flexDirection: "row", width: "600px", mb: 3 }}
    >
      <TextField
        margin="normal"
        fullWidth
        id="search"
        name="search"
        value={query}
        onInput={handleQuery}
        placeholder="Search Cafes..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="search"
                sx={{
                  color: mainTheme.palette.primary.main,
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Container>
  </form>
);

export default SearchBar;
