import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import Hotpost from './component/Hotpost/Hotpost';
import PlotlyCharts from './component/PlotlyCharts/PlotlyCharts';
import D3Charts from './component/D3Charts/D3Charts';
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
        <Route path="/D3Charts" element={<D3Charts />} />
        <Route path="/PlotlyCharts" element={<PlotlyCharts />} />
      </Routes>
    </div>
  );
}

export default App;