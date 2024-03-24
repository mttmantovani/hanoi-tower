import { useDraggable } from "@dnd-kit/core";
import { FC } from "react";

const colors = [
  "blue",
  "green",
  "DarkTurquoise",
  "brown",
  "red",
  "gray",
  "coral",
  "khaki",
];

const Disk: FC<{ id: string; size: number; disabled?: boolean }> = ({
  id,
  size,
  disabled,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
    });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: `${size * 30}px`,
        height: "20px",
        backgroundColor: colors[size - 1],
        borderRadius: "25px",
        margin: "0 auto",
        cursor: disabled ? "auto" : isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.5 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition: "opacity 0.2s ease",
      }}
      {...listeners}
      {...attributes}
    ></div>
  );
};

export default Disk;
