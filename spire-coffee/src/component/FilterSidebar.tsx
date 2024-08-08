import {
  AccordionActions,
  Box
} from "@mui/material";
import Button from "@mui/material/Button";
import CustomAccordion from "./CustomAccordion";
import { Level, Price, marks, valuetext } from "@/config/FilterItems";
import strings from "@/config/strings";

const FilterSidebar = () => {
  return (
    <>
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
      <CustomAccordion
        title={strings.filter.capacity}
        type="checkboxes"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      <CustomAccordion
        title={strings.filter.noise}
        type="checkboxes"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      <CustomAccordion
        title={strings.filter.price}
        type="checkboxes"
        labels={[Price.LOW, Price.MEDIUM, Price.HIGH]}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Filter</Button>
        </AccordionActions>
      </Box>
    </>
  );
}

export default FilterSidebar;
