import React from 'react';
import './App.css';
import YearlyCropTable from './components/YearlyCropTable';
import CropStatsTable from './components/CropStatsTable';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="tables">
        <h2>Yearly Crop Data</h2>
        <YearlyCropTable />
        <h2>Crop Statistics</h2>
        <CropStatsTable />
      </div>
    </div>
  );
}

export default App;
