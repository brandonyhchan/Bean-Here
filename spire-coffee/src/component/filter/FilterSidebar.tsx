import { Level, Price, marks, valuetext } from "@/config/FilterItems";
import strings from "@/config/strings";
import { ClickableIconButton } from "@/styles/iconTheme";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Container, Typography } from "@mui/material";
import CustomAccordion from "./CustomAccordion";

type FilterSidebarPropsType = {
  handleFilterButton: (event: React.MouseEvent<Element, MouseEvent>) => void;
  showFilterSidebar: boolean;
  isSmallScreen: boolean;
};

const FilterSidebar = ({
  handleFilterButton,
  showFilterSidebar,
  isSmallScreen
}: FilterSidebarPropsType) => {
  return (
    <form style={{ width: "300px", height: "100%" }}>
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
          Filter
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
      {/* Radio buttons, single selection */}
      <CustomAccordion
        title={strings.filter.capacity}
        type="radio"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      {/* Radio buttons, single selection */}
      <CustomAccordion
        title={strings.filter.noise}
        type="radio"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      {/* Checkboxes, multiple selection */}
      <CustomAccordion
        title={strings.filter.price}
        type="checkboxes"
        labels={[Price.LOW, Price.MEDIUM, Price.HIGH]}
      />
    </form>
  );
};

export default FilterSidebar;
