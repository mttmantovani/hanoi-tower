import { FC } from 'react';
import { DarkModeToggle } from './DarkModeToggle';

const Header: FC<{ title: string }> = ({ title }) => (
  <nav>
    <h1>{title}</h1>
    <DarkModeToggle />
  </nav>
);

export default Header;
