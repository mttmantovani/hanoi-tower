import { useDraggable } from '@dnd-kit/core';
import { blue } from '@mui/material/colors';
import { FC, useContext } from 'react';
import { NumberOfDisksContext } from '../context/NumberOfDisksContext';
import { ThemeContext } from '../context/ThemeContext';

interface DiskProps {
  id: string;
  size: number;
  disabled?: boolean;
}

const Disk: FC<DiskProps> = ({ id, size, disabled }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled
  });
  const { theme } = useContext(ThemeContext);

  const haloColor = theme === 'dark' ? '#B8CC37' : '#6D723C';

  const { numberOfDisks } = useContext(NumberOfDisksContext);
  const maxWidth = 100;
  const minWidth = 30;
  const diskWidth = ((size - 1) * (maxWidth - minWidth)) / (numberOfDisks - 1) + minWidth;

  return (
    <div
      className="disk"
      ref={setNodeRef}
      id={id}
      style={{
        width: `${diskWidth}px`,
        height: '20px',
        backgroundColor: blue[(size * 100) as keyof typeof blue],
        borderRadius: '25px',
        margin: '0 auto',
        cursor: disabled ? 'auto' : isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition: 'opacity 0.5s ease, background-color 0.5s ease',
        touchAction: 'none',
        boxShadow: disabled ? undefined : `0 0 20px 5px ${haloColor}`,
        zIndex: 2
      }}
      {...listeners}
      {...attributes}
    ></div>
  );
};

export default Disk;
