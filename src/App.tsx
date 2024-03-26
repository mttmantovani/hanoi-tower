import { useState, useMemo, FC, useEffect, useContext } from "react";
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
import { ThemeContext } from "./context/ThemeContext";
import { DarkModeToggle } from "./components/DarkModeToggle";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const App: FC = () => {
  const { theme } = useContext(ThemeContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Exo 2", "Arial", "sans-serif"].join(","),
        },
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

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
    <MuiThemeProvider theme={muiTheme}>
      <div className={`theme ${theme}`}>
        <div>
          <nav>
            <h1>Tower of Hanoi</h1>
            <DarkModeToggle />
          </nav>

          <div>
            <div id="settings">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <InputLabel
                  id="number-of-disks-select"
                  sx={{ marginRight: "10px" }}
                >
                  Number of disks:{" "}
                </InputLabel>
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
              <Button
                sx={{ marginTop: "1em" }}
                onClick={handleReset}
                variant="contained"
              >
                Reset
              </Button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
              <div id="tower">
                {towers.map((tower) => (
                  <Tower key={tower.id} id={tower.id} disks={tower.disks} />
                ))}
              </div>
            </DndContext>

            <div className="info">Number of moves: {numberOfMoves}</div>
            <div className="info">
              Minimum number of moves: {2 ** numberOfDisks - 1}
            </div>
          </div>

          <Dialog open={dialogOpen}>
            <DialogTitle>You won in {numberOfMoves} moves!</DialogTitle>
            <DialogActions>
              <Button onClick={handleReplay}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
