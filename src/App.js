import React from 'react';
import Pagelayout from './components/PageLayout/index';
import Home from './screens/Home/screen/index'

import './App.scss';



function App() {
  return (
    <Pagelayout>
      <div className="App">
        <Home />
      </div>
    </Pagelayout>
  );
}

export default App;
