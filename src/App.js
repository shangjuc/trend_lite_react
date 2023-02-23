import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar/Navbar.jsx';
import Timer from './component/Timer/Timer.jsx';
import Hotpost from './component/Hotpost/Hotpost.tsx';
import PlotlyCharts from './component/PlotlyCharts/PlotlyCharts.jsx';
import D3Charts from './component/D3Charts/D3Charts.jsx';
import LeafletMap from './component/LeafletMap/LeafletMap.jsx';
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
        <Route path="/LeafletMap" element={<LeafletMap />} />
      </Routes>
    </div>
  );
}

export default App;