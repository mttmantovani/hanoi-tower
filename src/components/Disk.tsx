import { useDraggable } from "@dnd-kit/core";
import { blue } from "@mui/material/colors";
import { FC } from "react";

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
        transition: "opacity 0.2s ease",
        touchAction: "none",
      }}
      {...listeners}
      {...attributes}
    ></div>
  );
};

export default Disk;
