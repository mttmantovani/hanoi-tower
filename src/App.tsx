import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button, CssBaseline, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import './App.css';
import { DarkModeToggle } from './components/DarkModeToggle';
import EndgameDialog from './components/EndgameDialog';
import Footer from './components/Footer';
import Rules from './components/Rules';
import Solution from './components/Solution';
import Tower from './components/Tower';
import { NumberOfDisksContext } from './context/NumberOfDisksContext';
import { ThemeContext } from './context/ThemeContext';

const App: FC = () => {
  const { theme } = useContext(ThemeContext);
  const { numberOfDisks, updateNumberOfDisks } = useContext(NumberOfDisksContext);

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ['Exo 2', 'Arial', 'sans-serif'].join(',')
        },
        palette: {
          mode: theme,
          tonalOffset: 0.5
        }
      }),
    [theme]
  );

  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const finalState = useMemo(() => [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(), [numberOfDisks]);

  const [towers, setTowers] = useState([
    {
      id: 'tower-1',
      disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse()
    },
    { id: 'tower-2', disks: [] },
    { id: 'tower-3', disks: [] }
  ]);

  useEffect(() => {
    if (
      towers.find(
        (tower) =>
          (tower.id === 'tower-2' || tower.id === 'tower-3') &&
          tower.disks.length === finalState.length &&
          tower.disks.every((value, index) => value === finalState[index])
      )
    ) {
      setIsDialogOpen(true);
    }
  }, [towers, finalState]);

  const onDiskNumberChange = (event: SelectChangeEvent) => {
    const updatedNumberOfDisks = parseInt(event.target.value);

    updateNumberOfDisks(updatedNumberOfDisks);
    setTowers([
      {
        id: 'tower-1',
        disks: [...Array(updatedNumberOfDisks).keys()].map((i) => i + 1).reverse()
      },
      { id: 'tower-2', disks: [] },
      { id: 'tower-3', disks: [] }
    ]);
    setNumberOfMoves(0);
  };

  const onReset = () => {
    setTowers([
      {
        id: 'tower-1',
        disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse()
      },
      { id: 'tower-2', disks: [] },
      { id: 'tower-3', disks: [] }
    ]);

    setNumberOfMoves(0);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    const activeDiskSize = parseInt(active.id.toString().split('-')[1], 10);

    const sourceTower = towers.find((tower) => tower.disks.includes(activeDiskSize));
    const targetTower = towers.find((tower) => tower.id === over.id);

    if (!sourceTower || !targetTower) {
      return;
    }

    if (targetTower.disks.length === 0 || activeDiskSize < targetTower.disks[targetTower.disks.length - 1]) {
      const updatedSourceTower = {
        ...sourceTower,
        disks: sourceTower.disks.filter((disk) => disk !== activeDiskSize)
      };

      const updatedTargetTower = {
        ...targetTower,
        disks: [...targetTower.disks, activeDiskSize]
      };

      setTowers(
        towers.map((tower) =>
          tower.id === sourceTower.id ? updatedSourceTower : tower.id === targetTower.id ? updatedTargetTower : tower
        )
      );

      setNumberOfMoves(numberOfMoves + 1);
    }
  };

  const onReplay = () => {
    setIsDialogOpen(false);
    setTowers([
      {
        id: 'tower-1',
        disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse()
      },
      { id: 'tower-2', disks: [] },
      { id: 'tower-3', disks: [] }
    ]);
    setNumberOfMoves(0);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`theme ${theme}`}>
        <div style={{ minWidth: '200px', maxWidth: '520px' }}>
          <nav>
            <h1>Tower of Hanoi</h1>
            <DarkModeToggle />
          </nav>

          <Rules />

          <div>
            <div id="settings">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  margin: '1em'
                }}
              >
                <InputLabel id="number-of-disks-select" sx={{ marginRight: '10px' }}>
                  Number of disks:{' '}
                </InputLabel>
                <Select label="Number of disks" value={numberOfDisks.toString()} onChange={onDiskNumberChange}>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                </Select>
              </div>
            </div>

            <div id="tower-container">
              <DndContext onDragEnd={onDragEnd}>
                <div id="tower">
                  {towers.map((tower) => (
                    <Tower key={tower.id} id={tower.id} disks={tower.disks} />
                  ))}
                </div>
              </DndContext>
              <div id="tower-base"></div>
            </div>

            <div id="info-container">
              <Button onClick={onReset} variant="contained">
                Reset
              </Button>
              <div>
                <div>Number of moves: {numberOfMoves}</div>
                <div>Minimum number of moves: {2 ** numberOfDisks - 1}</div>
              </div>
            </div>

            <Solution />
            <Footer />
          </div>

          <EndgameDialog open={isDialogOpen} numberOfMoves={numberOfMoves} onClick={onReplay} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
