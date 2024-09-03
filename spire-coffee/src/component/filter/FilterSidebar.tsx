import { marks, valuetext } from "@/config/FilterItems";
import strings from "@/config/strings";
import { useGlobalStateManager } from "@/context/StateContext";
import { ClickableIconButton } from "@/styles/iconTheme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Container, Typography } from "@mui/material";
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
  const {
    noiseFilter,
    setNoiseFilter,
    busynessFilter,
    setBusynessFilter,
    priceFilters,
    setPriceFilters,
  } = useGlobalStateManager();

  return (
    <form
      style={{ minWidth: isSmallScreen ? "100%" : "260px", height: "100%" }}
    >
      {/* this design might need to be changed */}
      <Container
        sx={{
          paddingLeft: 2,
          paddingTop: 5,
          marginLeft: 0.8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography textAlign={"start"} variant="h3" sx={{ mt: 0.5 }}>
          {strings.filter.heading}
        </Typography>
        {isSmallScreen && showFilterSidebar && (
          <Box sx={{ mr: 1.8 }}>
            <ClickableIconButton onClick={handleFilterButton}>
              <CloseRoundedIcon />
            </ClickableIconButton>
          </Box>
        )}
      </Container>
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
        title={strings.filter.capacity}
        value={busynessFilter}
        setValue={setBusynessFilter}
      />
      {/* Noise level Radio buttons */}
      <FilterRadio
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
    </form>
    // TODO: add button to clear/ reset filters
  );
};

export default FilterSidebar;
