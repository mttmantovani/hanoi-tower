import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CssBaseline,
  InputLabel,
  Link,
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
import Solution from "./components/Solution";
import Tower from "./components/Tower";
import { NumberOfDisksContext } from "./context/NumberOfDisksContext";
import { ThemeContext } from "./context/ThemeContext";

const App: FC = () => {
  const { theme, diskPalette, toggleDiskPalette } = useContext(ThemeContext);
  const { numberOfDisks, updateNumberOfDisks } =
    useContext(NumberOfDisksContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Exo 2", "Arial", "sans-serif"].join(","),
        },
        palette: {
          mode: theme,
          tonalOffset: 0.5,
        },
      }),
    [theme]
  );

  const [numberOfMoves, setNumberOfMoves] = useState(0);
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
          (tower.id === "tower-2" || tower.id === "tower-3") &&
          tower.disks.length === finalState.length &&
          tower.disks.every((value, index) => value === finalState[index])
      )
    ) {
      setIsDialogOpen(true);
    }
  }, [towers, finalState]);

  const handleDiskNumberChange = (event: SelectChangeEvent) => {
    const updatedNumberOfDisks = parseInt(event.target.value);

    updateNumberOfDisks(updatedNumberOfDisks);
    setTowers([
      {
        id: "tower-1",
        disks: [...Array(updatedNumberOfDisks).keys()]
          .map((i) => i + 1)
          .reverse(),
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

  const onPaletteChange = (event: SelectChangeEvent) => {
    toggleDiskPalette(event.target.value as "blue" | "red");
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`theme ${theme}`}>
        <div style={{ minWidth: "200px", maxWidth: "520px" }}>
          <nav>
            <h1>Tower of Hanoi</h1>
            <DarkModeToggle />
          </nav>

          <div>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Rules
              </AccordionSummary>
              <AccordionDetails>
                Reconstruct the entire stack of disks on one of the other rods,
                with the following rules:
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

            <div id="settings">
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  margin: "1em",
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
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                }}
              >
                <InputLabel
                  id="disk-palette-select"
                  sx={{ marginRight: "10px" }}
                >
                  Palette:{" "}
                </InputLabel>
                <Select
                  label="Palette"
                  value={diskPalette}
                  onChange={onPaletteChange}
                >
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                </Select>
              </div>
            </div>

            <div style={{ margin: "2em 1em 2em" }}>
              <DndContext onDragEnd={handleDragEnd}>
                <div id="tower">
                  {towers.map((tower) => (
                    <Tower key={tower.id} id={tower.id} disks={tower.disks} />
                  ))}
                </div>
              </DndContext>
              <div
                style={{
                  height: "20px",
                  border: "none",
                  borderRadius: "20px",
                  background:
                    "linear-gradient(90deg, rgba(74,60,38,1) 0%, rgba(139,110,53,1) 75%, rgba(255,249,227,1) 100%)",
                }}
              ></div>
            </div>

            <div
              style={{
                margin: "0 2em 3em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{ marginRight: "1em" }}
                onClick={handleReset}
                variant="contained"
              >
                Reset
              </Button>
              <div>
                <div className="info">Number of moves: {numberOfMoves}</div>
                <div className="info">
                  Minimum number of moves: {2 ** numberOfDisks - 1}
                </div>
              </div>
            </div>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Solution
              </AccordionSummary>
              <AccordionDetails>
                <Solution />
              </AccordionDetails>
            </Accordion>

            <div className={`footer ${theme}`}>
              <div>
                Powered by <FontAwesomeIcon icon={faReact} />
              </div>
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
