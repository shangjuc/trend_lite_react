import * as React from 'react';
import Navbar from './component/Navbar/Navbar';
import Hotpost from './component/Hotpost/Hotpost';
import Timer from './component/Timer/Timer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hotpost/>
      <Timer />
    </div>
  );
}

export default App;