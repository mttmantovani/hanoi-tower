import { CSSProperties, FC, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const DarkModeToggle: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const darkModeSwitchStyle: CSSProperties = {
    position: 'absolute',
    right: '5px'
  };

  return (
    <DarkModeSwitch
      style={darkModeSwitchStyle}
      checked={theme !== 'dark'}
      onChange={toggleTheme}
      size={'1.5rem'}
      moonColor="darkslategrey"
      sunColor="whitesmoke"
    />
  );
};
