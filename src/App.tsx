import { useState, FC } from "react";
import Tower from "./components/Tower";
import { DndContext } from "@dnd-kit/core";

const App: FC = () => {
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [numberOfDisks, setNumberOfDisks] = useState(3);

  const [towers, setTowers] = useState([
    {
      id: "tower-1",
      disks: [...Array(numberOfDisks).keys()].map((i) => i + 1).reverse(),
    },
    { id: "tower-2", disks: [] },
    { id: "tower-3", disks: [] },
  ]);

  const handleChangeDisks = (numberOfDisks: number) => {
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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!active || !over) {
      return;
    }

    // Assuming the id of the active disk is in the format 'disk-<size>'
    const activeDiskSize = parseInt(active.id.split("-")[1], 10);

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
      activeDiskSize < targetTower.disks[0]
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Hanoi Tower Game</h1>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {towers.map((tower) => (
            <Tower key={tower.id} id={tower.id} disks={tower.disks} />
          ))}
        </div>
      </DndContext>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <label>
          Number of Disks:{" "}
          <select onChange={(e) => handleChangeDisks(parseInt(e.target.value))}>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </label>
      </div>
      <div>Number of moves: {numberOfMoves}</div>
    </>
  );
};

export default App;
