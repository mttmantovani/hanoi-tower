import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FC, useContext } from 'react';
import { NumberOfDisksContext } from '../context/NumberOfDisksContext';
import towerOfHanoi from '../utils/towerOfHanoi';

const Solution: FC = () => {
  const { numberOfDisks } = useContext(NumberOfDisksContext);

  const listOfMoves = towerOfHanoi(numberOfDisks);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>Solution</AccordionSummary>
      <AccordionDetails>
        <h4>List of moves:</h4>
        <ol>
          {listOfMoves.map((move, index) => (
            <li key={index} style={{ paddingLeft: '1em' }}>
              <>
                {move[0]} &rarr; {move[5]}
              </>
            </li>
          ))}
        </ol>
      </AccordionDetails>
    </Accordion>
  );
};

export default Solution;
