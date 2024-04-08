import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { FC, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`footer ${theme}`}>
      <div>
        Powered by <FontAwesomeIcon icon={faReact} /> &mdash;{' '}
        <Link
          href="https://github.com/mttmantovani/hanoi-tower"
          underline="none"
          target="_blank"
          rel="noreferrer noopener"
        >
          <FontAwesomeIcon icon={faGithub} /> @mttmantovani
        </Link>
      </div>
    </div>
  );
};

export default Footer;
