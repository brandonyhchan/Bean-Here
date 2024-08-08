import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Box
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import CustomAccordion from "./CustomAccordion";
import { Level, Price } from "@/config/Level";

const marks = [
  {
    value: 0,
    label: '0 km',
  },
  {
    value: 10,
    label: '10 km',
  },
  {
    value: 20,
    label: '20 km',
  },
  {
    value: 30,
    label: '30 km',
  },
];

function valuetext(value: number) {
  return `${value} km`;
}


const FilterSidebar = () => {
  return (
    <>
      <CustomAccordion
        title="Distance (km)"
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
        title="Available Capacity"
        type="checkboxes"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      <CustomAccordion
        title="Noise Level"
        type="checkboxes"
        labels={[Level.LOW, Level.MEDIUM, Level.HIGH]}
      />
      <CustomAccordion
        title="Price"
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
