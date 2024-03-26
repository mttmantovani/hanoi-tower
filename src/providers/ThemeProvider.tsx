import { FC, PropsWithChildren, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useMediaQuery } from "@mui/material";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const isSystemDark = useMediaQuery("(prefers-color-scheme:dark)");
  const localStorageValue = localStorage.getItem("ui.theme") as
    | "light"
    | "dark";

  const [theme, setTheme] = useState<"light" | "dark">(
    localStorageValue ? localStorageValue : isSystemDark ? "dark" : "light"
  );

  const toggleTheme = (): void => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    localStorage.setItem("ui.theme", updatedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
