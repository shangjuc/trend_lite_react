import * as React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import Timer from './components/Timer/Timer.jsx';
import Hotpost from './components/Hotpost/Hotpost.tsx';
import PlotlyCharts from './components/PlotlyCharts/PlotlyCharts.jsx';
import D3Charts from './components/D3Charts/D3Charts.jsx';
import LeafletMap from './components/LeafletMap/LeafletMap.jsx';
import WC from './components/WC/WC'
import './App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='AAA'></div>
      <Routes>
        <Route path="/" element={<Timer />} />
        <Route path="/Timer" element={<Timer />} />
        <Route path="/HotPost" element={<Hotpost />} />
        <Route path="/D3Charts" element={<D3Charts />} />
        <Route path="/PlotlyCharts" element={<PlotlyCharts />} />
        <Route path="/LeafletMap" element={<LeafletMap />} />
        <Route path="/WC" element={<WC />} />
      </Routes>
    </div>
  );
}

export default App;