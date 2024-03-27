import { FC, PropsWithChildren, createContext, useState } from "react";

type NumberOfDisksContextType = {
  numberOfDisks: number;
  updateNumberOfDisks: (num: number) => void;
};

export const NumberOfDisksContext = createContext<NumberOfDisksContextType>({
  numberOfDisks: 3,
  updateNumberOfDisks: () => {},
});

export const NumberOfDisksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [numberOfDisks, setNumberOfDisks] = useState(3);

  const updateNumberOfDisks = (num: number) => {
    setNumberOfDisks(num);
  };

  return (
    <NumberOfDisksContext.Provider
      value={{ numberOfDisks, updateNumberOfDisks }}
    >
      {children}
    </NumberOfDisksContext.Provider>
  );
};
