import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { ReactNode } from "react";

type FilterAccordionProps = {
  children: ReactNode;
  title: string;
};

const FilterAccordion: React.FC<FilterAccordionProps> = ({
  children,
  title,
}: FilterAccordionProps) => {
  return (
    <Accordion sx={{ p: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        {title}
      </AccordionSummary>
      <AccordionDetails sx={{ pr: 5, pl: 5 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
