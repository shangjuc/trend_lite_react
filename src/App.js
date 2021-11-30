import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Hotpost from './component/Hotpost/Hotpost';
import PlotlyChart from './component/PlotlyChart/PlotlyChart';
import D3Chart from './component/D3Chart/D3Chart';
import Timer from './component/Timer/Timer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/HotPost" element={<Hotpost />} />
        <Route path="/D3Chart" element={<D3Chart />} />
        <Route path="/PlotlyChart" element={<PlotlyChart />} />
      </Routes>
    </div>
  );
}

export default App;