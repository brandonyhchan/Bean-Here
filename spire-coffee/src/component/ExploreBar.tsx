import SearchBar from "@/component/search/SearchBar";
import { ClickableIconButton } from "@/styles/iconTheme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import { Box } from "@mui/material";
import React from "react";
import SortMenu from "./sort/SortMenu";

type SearchAndFilterPropsType = {
  searchCafeName: string;
  showCloseButton: boolean;
  handleSearchQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseButton: (event: React.MouseEvent<Element, MouseEvent>) => void;
  handleFilterButton: (event: React.MouseEvent<Element, MouseEvent>) => void;
  isSmallScreen: boolean;
  showFilterSidebar: boolean;
};

const SearchAndFilter = ({
  searchCafeName,
  showCloseButton,
  handleSearchQuery,
  handleCloseButton,
  handleFilterButton,
  isSmallScreen,
  showFilterSidebar,
}: SearchAndFilterPropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: {
          xs: 0.5,
          sm: 0.5,
        }
      }}
    >
      <SearchBar
        query={searchCafeName}
        handleQuery={handleSearchQuery}
        showCloseButton={showCloseButton}
        handleClick={handleCloseButton}
      />
      {isSmallScreen && (
        <Box sx={{ mt: 3 }}>
          <ClickableIconButton onClick={handleFilterButton}>
            {showFilterSidebar ? <CloseRoundedIcon /> : <TuneRoundedIcon sx={{ ml: 0 }} />}
          </ClickableIconButton>
        </Box>
      )}
      {!(isSmallScreen && !showFilterSidebar) && (
        <Box sx={{ display: "flex", alignItems: "center", pt: 1 }}>
          <SortMenu />
        </Box>
      )}
    </Box>
  );
};

export default SearchAndFilter;
