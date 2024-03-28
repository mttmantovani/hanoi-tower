import { FC, useContext } from "react";
import { NumberOfDisksContext } from "../context/NumberOfDisksContext";
import towerOfHanoi from "../utils/towerOfHanoi";

const Solution: FC = () => {
  const { numberOfDisks } = useContext(NumberOfDisksContext);

  const listOfMoves = towerOfHanoi(numberOfDisks);

  return (
    <ol style={{ whiteSpace: "nowrap" }}>
      {listOfMoves.map((move, index) => (
        <li key={index}>
          <>
            {move[0]} &rarr; {move[5]}
          </>
        </li>
      ))}
    </ol>
  );
};

export default Solution;
