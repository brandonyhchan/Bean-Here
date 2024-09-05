import { marks, RadioAttribute, valuetext } from "@/config/FilterItems";
import strings from "@/config/strings";
import { useGlobalStateManager } from "@/context/StateContext";
import { ClickableIconButton } from "@/styles/iconTheme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Button, Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CustomAccordion from "./CustomAccordion";
import FilterCheckbox from "./FilterCheckbox";
import FilterRadio from "./FilterRadio";

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
  // eslint-disable-next-line prefer-const
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    noiseFilter,
    setNoiseFilter,
    busynessFilter,
    setBusynessFilter,
    priceFilters,
    setPriceFilters,
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
      style={{ width: isSmallScreen ? "100%" : "260px" }}
    >
      {/* this design might need to be changed */}
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
      <CustomAccordion
        title={strings.filter.distance}
        type="slider"
        sliderProps={{
          defaultValue: 10,
          step: 5,
          max: 30,
          marks: marks,
          getAriaValueText: valuetext,
        }}
      />
      {/* Busyness Radio buttons */}
      <FilterRadio
        type={RadioAttribute.CAPACITY}
        title={strings.filter.capacity}
        value={busynessFilter}
        setValue={setBusynessFilter}
      />
      {/* Noise level Radio buttons */}
      <FilterRadio
        type={RadioAttribute.NOISE}
        title={strings.filter.noise}
        value={noiseFilter}
        setValue={setNoiseFilter}
      />
      {/* Checkboxes, multiple selection */}
      <FilterCheckbox
        title={strings.filter.price}
        value={priceFilters}
        setValue={setPriceFilters}
      />

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button color="primary" onClick={clearFilters}>
          {strings.filter.clearFilters}
        </Button>
      </Box>
    </form>
  );
};

export default FilterSidebar;
