import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Button, SelectChangeEvent } from '@mui/material';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
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

  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const targetDiskOrder = useMemo(() => [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(), [numberOfDisks]);
  const initialState = (numberOfDisks: number) => [
    {
      id: 'tower-1',
      disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse()
    },
    { id: 'tower-2', disks: [] },
    { id: 'tower-3', disks: [] }
  ];
  const [towers, setTowers] = useState(initialState(numberOfDisks));

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
    const updatedNumberOfDisks = parseInt(event.target.value);

    updateNumberOfDisks(updatedNumberOfDisks);
    setTowers(initialState(updatedNumberOfDisks));
    setNumberOfMoves(0);
  };

  const onReset = () => {
    setTowers(initialState(numberOfDisks));
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
    setTowers(initialState(numberOfDisks));
    setNumberOfMoves(0);
  };

  return (
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
  );
};

export default App;
