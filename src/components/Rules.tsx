import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Link } from '@mui/material';
import { FC } from 'react';

const Rules: FC = () => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Rules</AccordionSummary>
    <AccordionDetails>
      Reconstruct the entire stack of disks on either rod 2️⃣ or 3️⃣, with the following rules:
      <ul>
        <li>You can only move one disk at a time</li>
        <li>You cannot place a disk on top of a smaller disk</li>
      </ul>
      <Link
        href="https://en.wikipedia.org/wiki/Tower_of_Hanoi"
        underline="hover"
        target="_blank"
        rel="noreferrer noopener"
      >
        Learn more
      </Link>
    </AccordionDetails>
  </Accordion>
);

export default Rules;
