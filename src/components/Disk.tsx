import { useDraggable } from "@dnd-kit/core";
import { blue } from "@mui/material/colors";
import { FC, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface DiskProps {
  id: string;
  size: number;
  disabled?: boolean;
}

const Disk: FC<DiskProps> = ({ id, size, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
    });

  const { theme } = useContext(ThemeContext);

  const haloColor = theme === "dark" ? "#B8CC37" : "#6D723C";

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={{
        width: `${size * 30}px`,
        height: "20px",
        backgroundColor: blue[(size * 100) as keyof typeof blue],
        borderRadius: "25px",
        margin: "0 auto",
        cursor: disabled ? "auto" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition: "opacity 0.5s ease",
        touchAction: "none",
        boxShadow: disabled ? undefined : `0 0 20px 5px ${haloColor}`,
      }}
      {...listeners}
      {...attributes}
    ></div>
  );
};

export default Disk;
