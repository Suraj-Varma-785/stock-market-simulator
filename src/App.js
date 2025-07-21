import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import StockSearch from './components/StockSearch';

function App() {
  const [cash, setCash] = useState(10000);
  const [holdings, setHoldings] = useState({}); // { symbol: quantity }
  const [transactions, setTransactions] = useState([]); // Optional for transaction history

  // Helper function for recording transactions (optional)
  const addTransaction = (tx) => setTransactions(prev => [tx, ...prev]);

  return (
    <>
      <Navbar />
      <Portfolio cash={cash} holdings={holdings} />
      <StockSearch
        cash={cash}
        holdings={holdings}
        setCash={setCash}
        setHoldings={setHoldings}
        addTransaction={addTransaction}
      />
      {/* <TransactionHistory transactions={transactions} />   // Optional */}
    </>
  );
}

export default App;
