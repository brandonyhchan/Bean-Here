import React from "react";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  Slider 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Level, Price } from "@/config/Level";

interface CustomAccordionProps {
  title: string;
  type: 'slider' | 'checkboxes';
  sliderProps?: {
    defaultValue: number;
    step: number;
    max: number;
    marks: { value: number; label: string }[];
    getAriaValueText: (value: number) => string;
  };
  labels?: Level[] | Price[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  type,
  sliderProps,
  labels,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {type === 'slider' && sliderProps && (
          <Slider
            aria-label="Always visible"
            defaultValue={sliderProps.defaultValue}
            step={sliderProps.step}
            max={sliderProps.max}
            marks={sliderProps.marks}
            getAriaValueText={sliderProps.getAriaValueText}
            valueLabelDisplay="on"
          />
        )}
        {type === 'checkboxes' && labels && (
          <FormGroup>
            {labels.map((label, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox defaultChecked />}
                label={label}
              />
            ))}
          </FormGroup>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
