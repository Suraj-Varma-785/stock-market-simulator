import React, { useState } from 'react';

function StockSearch() {
  const [query, setQuery] = useState('');

  return (
    <section style={{ padding: '2rem' }}>
      <h3>Stock Search</h3>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter stock symbol or name"
      />
    </section>
  );
}

export default StockSearch;
