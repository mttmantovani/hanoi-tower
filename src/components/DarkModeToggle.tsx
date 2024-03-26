import { CSSProperties, FC, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const DarkModeToggle: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const darkModeSwitchStyle: CSSProperties = {
    position: "absolute",
    right: 0,
    padding: "2%",
  };

  return (
    <DarkModeSwitch
      style={darkModeSwitchStyle}
      checked={theme !== "dark"}
      onChange={toggleTheme}
      size={30}
      moonColor="darkslategrey"
      sunColor="whitesmoke"
    />
  );
};
