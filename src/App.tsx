import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

import Routes from './routes';

import GlobalStyle from './styles/global';
import { FoodProvider } from './hooks/useFood';

Modal.setAppElement('#root')

const App = () => (
  <FoodProvider>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </FoodProvider>
);

export default App;
