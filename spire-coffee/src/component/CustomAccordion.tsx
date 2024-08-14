import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Radio,
  RadioGroup,
  FormControl
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Level, Price } from "@/config/FilterItems";

interface CustomAccordionProps {
  title: string;
  type: "slider" | "checkboxes" | "radio";
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
  const [value, setValue] = React.useState<Level | Price>(
    labels && labels.length > 0 ? labels[0] : ("" as Level | Price)
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as Level | Price);
  };

  return (
    <Accordion sx={{ p: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {type === "slider" && sliderProps && (
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
        {type === "checkboxes" && labels && (
          <FormGroup>
            {labels.map((label, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                label={label}
              />
            ))}
          </FormGroup>
        )}
        {type === "radio" && labels && (
          <FormControl>
            <RadioGroup value={value.toString()} onChange={handleChange}>
              {labels.map((label, index) => (
                <FormControlLabel
                  key={index}
                  value={label.toString()}
                  control={<Radio />}
                  label={label.toString()}
                />
              ))}
            </RadioGroup>
          </FormControl>

        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
