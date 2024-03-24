import { useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren } from "react";
import Disk from "./Disk";

interface TowerProps {
  id: string;
  disks: number[];
}

const Tower: FC<PropsWithChildren<TowerProps>> = ({ id, disks }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "flex-start",
        background: isOver ? "green" : undefined,
        border: "2px solid black",
        width: "180px",
        minHeight: "250px",
        margin: "0 10px",
      }}
    >
      {disks.map((size, index) => (
        <Disk
          key={index}
          id={`disk-${size}`}
          size={size}
          disabled={index !== disks.length - 1}
        />
      ))}
    </div>
  );
};

export default Tower;
