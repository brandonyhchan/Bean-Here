import mainTheme from '@/styles/mainTheme';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from "@mui/icons-material/Search";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchBarProps {
  showCloseButton: boolean,
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  query: string;
  handleQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showCloseButton, query, handleClick, handleQuery
}) => (
  <form>
    <Container 
    disableGutters
    sx={{
      display: "flex", flexDirection: "row", mb: 3,
      width: {
        xs: '272px',
        sm: '335px',
        md: '450px',
        lg: '600px',
      },
    }}>
      <TextField
        margin="normal"
        fullWidth
        id="search"
        name="search"
        value={query}
        onInput={handleQuery}
        placeholder="Search Cafes..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {showCloseButton && query.length > 0 && (
                <IconButton
                  onClick={handleClick}
                  aria-label="clear"
                  sx={{ color: mainTheme.palette.primary.main }}
                >
                  <HighlightOffIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Container>
  </form>
);

export default SearchBar;
