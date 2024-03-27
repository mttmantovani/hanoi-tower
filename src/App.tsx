import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { FC, useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { DarkModeToggle } from "./components/DarkModeToggle";
import EndgameDialog from "./components/EndgameDialog";
import Tower from "./components/Tower";
import { ThemeContext } from "./context/ThemeContext";
import { useNumberOfDisks } from "./hooks/useNumberOfDisks";

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
  const { numberOfDisks, setNumberOfDisks } = useNumberOfDisks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setIsDialogOpen(true);
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

    const activeDiskSize = parseInt(active.id.toString().split("-")[1], 10);

    const sourceTower = towers.find((tower) =>
      tower.disks.includes(activeDiskSize)
    );
    const targetTower = towers.find((tower) => tower.id === over.id);

    if (!sourceTower || !targetTower) {
      return;
    }

    if (
      targetTower.disks.length === 0 ||
      activeDiskSize < targetTower.disks[targetTower.disks.length - 1]
    ) {
      const updatedSourceTower = {
        ...sourceTower,
        disks: sourceTower.disks.filter((disk) => disk !== activeDiskSize),
      };

      const updatedTargetTower = {
        ...targetTower,
        disks: [...targetTower.disks, activeDiskSize],
      };

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
    setIsDialogOpen(false);
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

          <EndgameDialog
            open={isDialogOpen}
            numberOfMoves={numberOfMoves}
            onClick={handleReplay}
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
