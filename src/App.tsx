import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button, CssBaseline, SelectChangeEvent } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import './App.css';
import DiskNumberInput from './components/DiskNumberInput';
import EndgameDialog from './components/EndgameDialog';
import Footer from './components/Footer';
import Header from './components/Header';
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

  const targetDiskOrder = useMemo(() => [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(), [numberOfDisks]);
  const initialState = [
    {
      id: 'tower-1',
      disks: targetDiskOrder
    },
    { id: 'tower-2', disks: [] },
    { id: 'tower-3', disks: [] }
  ];
  const [towers, setTowers] = useState(initialState);

  useLayoutEffect(() => {
    setTowers([
      {
        id: 'tower-1',
        disks: targetDiskOrder
      },
      { id: 'tower-2', disks: [] },
      { id: 'tower-3', disks: [] }
    ]);
  }, [targetDiskOrder]);

  useEffect(() => {
    if (
      towers.find(
        (tower) =>
          (tower.id === 'tower-2' || tower.id === 'tower-3') &&
          tower.disks.length === targetDiskOrder.length &&
          tower.disks.every((value, index) => value === targetDiskOrder[index])
      )
    ) {
      setIsDialogOpen(true);
    }
  }, [towers, targetDiskOrder]);

  const onDiskNumberChange = (event: SelectChangeEvent) => {
    updateNumberOfDisks(parseInt(event.target.value));
    setNumberOfMoves(0);
  };

  const onReset = () => {
    setTowers(initialState);
    setNumberOfMoves(0);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
    setTowers(initialState);
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

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={`theme ${theme}`}>
        <div id="main">
          <Header title="Tower of Hanoi" />

          <Rules />

          <div>
            <DiskNumberInput min={3} max={8} onChange={onDiskNumberChange} />

            <div id="tower-container">
              <div id="tower">
                <DndContext onDragEnd={onDragEnd}>
                  {towers.map((tower) => (
                    <Tower key={tower.id} id={tower.id} disks={tower.disks} />
                  ))}
                </DndContext>
              </div>
              <div id="tower-base">
                <div>1️⃣</div>
                <div>2️⃣</div>
                <div>3️⃣</div>
              </div>
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

          <EndgameDialog open={isDialogOpen} numberOfMoves={numberOfMoves} onClose={onDialogClose} />
        </div>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
