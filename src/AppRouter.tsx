import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const AppRouter: FC = () => (
  <Router basename="/hanoi-tower">
    <App />
  </Router>
);

export default AppRouter;
