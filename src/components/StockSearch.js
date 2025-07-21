import React, { useState } from 'react';
import { fetchStockQuote } from '../api/stockApi';

function StockSearch({ cash, holdings, setCash, setHoldings, addTransaction }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [tradeMsg, setTradeMsg] = useState('');

  // ...existing handleSearch code...
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTradeMsg('');
    try {
      const stock = await fetchStockQuote(query.trim().toUpperCase());
      setResult(stock);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
    setLoading(false);
  };

  const handleBuy = () => {
    setTradeMsg('');
    if (!result || !result.price) return;
    const totalCost = quantity * parseFloat(result.price);
    if (cash < totalCost) {
      setError('Not enough cash to complete purchase.');
      return;
    }
    setCash(cash - totalCost);
    setHoldings(prev => ({
      ...prev,
      [result.symbol]: (prev[result.symbol] || 0) + Number(quantity)
    }));
    addTransaction && addTransaction({
      type: 'buy',
      symbol: result.symbol,
      price: parseFloat(result.price),
      qty: Number(quantity),
      date: new Date().toISOString()
    });
    setTradeMsg(`Bought ${quantity} shares of ${result.symbol}.`);
    setError('');
  };

  const handleSell = () => {
    setTradeMsg('');
    if (!result || !result.price) return;
    const owned = holdings[result.symbol] || 0;
    if (Number(quantity) > owned) {
      setError('You do not own enough shares to sell.');
      return;
    }
    const proceeds = quantity * parseFloat(result.price);
    setCash(cash + proceeds);
    setHoldings(prev => ({
      ...prev,
      [result.symbol]: owned - Number(quantity)
    }));
    addTransaction && addTransaction({
      type: 'sell',
      symbol: result.symbol,
      price: parseFloat(result.price),
      qty: Number(quantity),
      date: new Date().toISOString()
    });
    setTradeMsg(`Sold ${quantity} shares of ${result.symbol}.`);
    setError('');
  };

  return (
    <section style={{ padding: '2rem' }}>
      <h3>Stock Search</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />
        <button type="submit" disabled={loading || !query}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {tradeMsg && <p style={{ color: 'green' }}>{tradeMsg}</p>}
      {result && (
        <div>
          <h4>Result</h4>
          <p>Symbol: {result.symbol}<br />Price: ${parseFloat(result.price).toFixed(2)}</p>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              style={{ width: '5ch', marginLeft: '0.5rem' }}
            />
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleBuy} disabled={loading || quantity < 1}>Buy</button>
            <button onClick={handleSell} disabled={loading || quantity < 1}>Sell</button>
          </div>
          <p>You own: {holdings[result.symbol] || 0} shares of {result.symbol}</p>
        </div>
      )}
    </section>
  );
}

export default StockSearch;
