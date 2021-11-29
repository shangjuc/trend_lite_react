import * as React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Hotpost from './component/Hotpost/Hotpost';
import Timer from './component/Timer/Timer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/Hotpost" element={<Hotpost />} />
      </Routes>
    </div>
  );
}

export default App;