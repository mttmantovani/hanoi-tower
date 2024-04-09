import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {}
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const isSystemDark = useMediaQuery('(prefers-color-scheme:dark)');
  const localStorageValue = localStorage.getItem('ui.theme') as 'light' | 'dark';

  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorageValue ? localStorageValue : isSystemDark ? 'dark' : 'light'
  );

  const toggleTheme = (): void => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(updatedTheme);
    localStorage.setItem('ui.theme', updatedTheme);
  };

  const muiTheme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ['Exo 2', 'Arial', 'sans-serif'].join(',')
        },
        palette: {
          mode: theme,
          tonalOffset: 0.5
        }
      }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
