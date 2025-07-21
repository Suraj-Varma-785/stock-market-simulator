import React, { useState } from 'react';
import { fetchStockQuote } from '../api/stockApi';

function StockSearch() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const stock = await fetchStockQuote(query);
      setResult(stock);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
    setLoading(false);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h4>Result</h4>
          <p>
            Symbol: {result.symbol} <br />
            Price: ${parseFloat(result.price).toFixed(2)}
          </p>
        </div>
      )}
    </section>
  );
}

export default StockSearch;
