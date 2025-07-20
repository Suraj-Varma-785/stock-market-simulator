import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import StockSearch from './components/StockSearch';

function App() {
  // Add state for cash balance (can add holdings later)
  const [cash, setCash] = useState(10000);

  return (
    <>
      <Navbar />
      <Portfolio cash={cash} />
      <StockSearch />
    </>
  );
}

export default App;
