import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FC } from "react";

interface EndgameDialogProps {
  open: boolean;
  numberOfMoves: number;
  onClick: () => void;
}

const EndgameDialog: FC<EndgameDialogProps> = ({
  open,
  numberOfMoves,
  onClick,
}) => (
  <Dialog open={open}>
    <DialogTitle>You won in {numberOfMoves} moves!</DialogTitle>
    <DialogActions>
      <Button onClick={onClick}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default EndgameDialog;
