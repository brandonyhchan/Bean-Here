import { 
  Typography, 
  Box,
  Container 
} from "@mui/material";
import Button from "@mui/material/Button";
import CustomAccordion from "./CustomAccordion";
import { Level, Price, marks, valuetext } from "@/config/FilterItems";
import strings from "@/config/strings";

const FilterSidebar = () => {
  return (
    <form style={{ width: "300px", height: "100%" }}>
      {/* this design might need to be changed */}
      <Container sx={{ paddingLeft: 2, paddingTop: 5, marginLeft: 0.8 }}>
        <Typography textAlign={'start'} variant="h3">Filter</Typography>
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
      {/* Buttons need to be updated and form needs to be set up */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button>Cancel</Button>
        <Button>Filter</Button>
      </Box>
    </form>
  );
};

export default FilterSidebar;
