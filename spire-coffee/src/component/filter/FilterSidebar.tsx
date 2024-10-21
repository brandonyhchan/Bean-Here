import { ExploreSortOption, Level, RadioAttribute } from "@/config/FilterItems";
import strings from "@/config/strings";
import { useGlobalStateManager } from "@/context/StateContext";
import { ClickableIconButton } from "@/styles/iconTheme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CustomButton from "../CustomButton";
import FilterCheckbox from "./FilterCheckbox";
import FilterRadio from "./FilterRadio";
import FilterSlider from "./FilterSlider";

type FilterSidebarPropsType = {
  handleFilterButton: (event: React.MouseEvent<Element, MouseEvent>) => void;
  showFilterSidebar: boolean;
  isSmallScreen: boolean;
};

const FilterSidebar = ({
  handleFilterButton,
  showFilterSidebar,
  isSmallScreen,
}: FilterSidebarPropsType) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    noiseFilter,
    setNoiseFilter,
    busynessFilter,
    setBusynessFilter,
    priceFilters,
    setPriceFilters,
    distanceFilterValue,
    setDistanceFilterValue,
    exploreSortOption,
    setExploreSortOption,
  } = useGlobalStateManager();

  const clearFilters = () => {
    setNoiseFilter(undefined);
    setBusynessFilter(undefined);
    setPriceFilters([]);
    searchParams = new URLSearchParams();
    setSearchParams(searchParams);
  };

  return (
    <form
      style={{
        width: isSmallScreen ? "100%" : "260px",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          pl: 3.8,
          pr: 3,
          pt: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography textAlign={"start"} variant="h3">
          {strings.filter.heading}
        </Typography>

        {isSmallScreen && showFilterSidebar && (
          <ClickableIconButton onClick={handleFilterButton}>
            <CloseRoundedIcon />
          </ClickableIconButton>
        )}
      </Box>
      <FilterSlider
        title={strings.filter.distance}
        value={distanceFilterValue}
        setValue={setDistanceFilterValue}
      />

      {/* Busyness Radio buttons */}
      <FilterRadio
        type={RadioAttribute.CAPACITY}
        title={strings.filter.capacity}
        value={busynessFilter}
        setValue={(value) => setBusynessFilter(value as Level | undefined)}
      />
      {/* Noise level Radio buttons */}
      <FilterRadio
        type={RadioAttribute.NOISE}
        title={strings.filter.noise}
        value={noiseFilter}
        setValue={(value) => setNoiseFilter(value as Level | undefined)}
      />
      {/* Checkboxes, multiple selection */}
      <FilterCheckbox
        title={strings.filter.price}
        value={priceFilters}
        setValue={setPriceFilters}
      />
      {isSmallScreen && showFilterSidebar && (
        <FilterRadio
          type={RadioAttribute.SORT}
          title={strings.sort.heading}
          value={exploreSortOption}
          setValue={(value) =>
            setExploreSortOption(value as ExploreSortOption | undefined)
          }
        />
      )}
      <Box sx={{ pb: 2, display: "flex", justifyContent: "center" }}>
        <CustomButton
          color="primary"
          onClick={clearFilters}
          text={strings.filter.clearFilters}
        />
      </Box>
    </form>
  );
};

export default FilterSidebar;
