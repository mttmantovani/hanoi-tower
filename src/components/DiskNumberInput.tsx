import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC, useContext } from 'react';
import { NumberOfDisksContext } from '../context/NumberOfDisksContext';

interface DiskNumberInputProps {
  min: number;
  max: number;
  onChange: (event: SelectChangeEvent) => void;
}

const DiskNumberInput: FC<DiskNumberInputProps> = ({ min, max, onChange }) => {
  const { numberOfDisks } = useContext(NumberOfDisksContext);
  const choices: number[] = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  return (
    <div id="disk-number-input">
      <div>
        <InputLabel>Number of disks: </InputLabel>
        <Select label="Number of disks" value={numberOfDisks.toString()} onChange={onChange}>
          {choices.map((value: number) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default DiskNumberInput;
