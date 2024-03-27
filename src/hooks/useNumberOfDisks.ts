import { useState } from "react";

interface UseNumberOfDisks {
  numberOfDisks: number;
  setNumberOfDisks: (num: number) => void;
}

export const useNumberOfDisks = (): UseNumberOfDisks => {
  const [numberOfDisks, setNumberOfDisks] = useState(3);

  return { numberOfDisks, setNumberOfDisks };
};
