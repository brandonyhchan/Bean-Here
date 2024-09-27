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
      <AccordionDetails sx={{ pr: 2, pl: 2 }}>{children}</AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
