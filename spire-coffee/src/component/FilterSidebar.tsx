import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import { AccordionActions, AccordionSummary, AccordionDetails, Slider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

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
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Distance (km)
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            aria-label="Always visible"
            defaultValue={10}
            getAriaValueText={valuetext}
            step={5}
            max={30}
            marks={marks}
            valueLabelDisplay="on"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Available Capacity
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Noise Level
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Price
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </div>
  );
}

export default FilterSidebar;
