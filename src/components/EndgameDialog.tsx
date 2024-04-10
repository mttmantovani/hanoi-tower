import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FC } from 'react';

interface EndgameDialogProps {
  open: boolean;
  numberOfMoves: number;
  onClose: () => void;
}

const EndgameDialog: FC<EndgameDialogProps> = ({ open, numberOfMoves, onClose }) => (
  <Dialog open={open}>
    <DialogTitle>You won in {numberOfMoves} moves!</DialogTitle>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default EndgameDialog;
