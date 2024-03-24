import { useState, useMemo, FC, useEffect } from "react";
import Tower from "./components/Tower";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./App.css";

const App: FC = () => {
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [numberOfDisks, setNumberOfDisks] = useState(3);
  const [dialogOpen, setDialogOpen] = useState(false);

  const finalState = useMemo(
    () => [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
    [numberOfDisks]
  );

  const [towers, setTowers] = useState([
    {
      id: "tower-1",
      disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
    },
    { id: "tower-2", disks: [] },
    { id: "tower-3", disks: [] },
  ]);

  useEffect(() => {
    if (
      towers.find(
        (tower) =>
          tower.id === "tower-3" &&
          tower.disks.length === finalState.length &&
          tower.disks.every((value, index) => value === finalState[index])
      )
    ) {
      setDialogOpen(true);
    }
  }, [towers, finalState]);

  const handleDiskNumberChange = (event: SelectChangeEvent) => {
    const numberOfDisks = parseInt(event.target.value);

    setNumberOfDisks(numberOfDisks);
    setTowers([
      {
        id: "tower-1",
        disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
      },
      { id: "tower-2", disks: [] },
      { id: "tower-3", disks: [] },
    ]);
    setNumberOfMoves(0);
  };

  const handleReset = () => {
    setTowers([
      {
        id: "tower-1",
        disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
      },
      { id: "tower-2", disks: [] },
      { id: "tower-3", disks: [] },
    ]);

    setNumberOfMoves(0);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    // Assuming the id of the active disk is in the format 'disk-<size>'
    const activeDiskSize = parseInt(active.id.toString().split("-")[1], 10);

    // Find the source and target towers
    const sourceTower = towers.find((tower) =>
      tower.disks.includes(activeDiskSize)
    );
    const targetTower = towers.find((tower) => tower.id === over.id);

    if (!sourceTower || !targetTower) {
      return;
    }

    // Check if the move is valid
    if (
      targetTower.disks.length === 0 ||
      activeDiskSize < targetTower.disks[targetTower.disks.length - 1]
    ) {
      // Remove the disk from the source tower
      const updatedSourceTower = {
        ...sourceTower,
        disks: sourceTower.disks.filter((disk) => disk !== activeDiskSize),
      };

      // Add the disk to the target tower
      const updatedTargetTower = {
        ...targetTower,
        disks: [...targetTower.disks, activeDiskSize],
      };

      // Update the game state
      setTowers(
        towers.map((tower) =>
          tower.id === sourceTower.id
            ? updatedSourceTower
            : tower.id === targetTower.id
            ? updatedTargetTower
            : tower
        )
      );

      setNumberOfMoves(numberOfMoves + 1);
    }
  };

  const handleReplay = () => {
    setDialogOpen(false);
    setTowers([
      {
        id: "tower-1",
        disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
      },
      { id: "tower-2", disks: [] },
      { id: "tower-3", disks: [] },
    ]);
    setNumberOfMoves(0);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Tower of Hanoi</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <InputLabel id="demo-simple-select-label">Number of disks: </InputLabel>
        <Select
          label="Number of disks"
          value={numberOfDisks.toString()}
          onChange={handleDiskNumberChange}
        >
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
        </Select>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {towers.map((tower) => (
            <Tower key={tower.id} id={tower.id} disks={tower.disks} />
          ))}
        </div>
      </DndContext>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        Number of moves: {numberOfMoves}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        Minimum number of moves: {2 ** numberOfDisks - 1}
      </div>
      <Dialog open={dialogOpen}>
        <DialogTitle>You won!</DialogTitle>
        <DialogActions>
          <Button onClick={handleReplay}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
