import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

import Routes from './routes';

import GlobalStyle from './styles/global';

Modal.setAppElement('#root')

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </>
);

export default App;
