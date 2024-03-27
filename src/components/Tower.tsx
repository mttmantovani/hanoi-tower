import { useDroppable } from "@dnd-kit/core";
import { FC, PropsWithChildren, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Disk from "./Disk";

interface TowerProps {
  id: string;
  disks: number[];
}

const Tower: FC<PropsWithChildren<TowerProps>> = ({ id, disks }) => {
  const { active, isOver, setNodeRef } = useDroppable({
    id,
  });

  const { theme } = useContext(ThemeContext);
  const activeDiskSize = active
    ? parseInt(active.id.toString().split("-")[1], 10)
    : undefined;

  const haloColor = theme === "dark" ? "#B8CC37" : "#6D723C";

  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "flex-start",
        border: "2px solid black",
        boxShadow:
          activeDiskSize !== undefined &&
          isOver &&
          !disks.includes(activeDiskSize)
            ? `0 0 20px 5px ${haloColor}`
            : undefined,
        width: "250px",
        minHeight: "250px",
        margin: "0 10px",

        WebkitUserSelect: "none" /* Safari */,
        userSelect: "none",
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
