import { BrowserRouter as Router }from 'react-router-dom';
import styles from './App.module.css';
import RouteSwitch from '../RouteSwitch/RouteSwitch'
import Header from '../Header/Header';

function App() {
  return (
    <Router>            
      <Header />
      <div className={styles.app}>
        <RouteSwitch />    
      </div>
    </Router>
    
  );
}

export default App;
