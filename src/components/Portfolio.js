import React from 'react';

function Portfolio({ cash, holdings }) {
  return (
    <section style={{ padding: '2rem' }}>
      <h2>Your Virtual Portfolio</h2>
      <p>Balance: ${cash.toLocaleString()}</p>
      <h3>Holdings</h3>
      {Object.keys(holdings).length === 0 ? (
        <p>You do not own any stocks yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(holdings).map(([symbol, qty]) => (
              qty > 0
                ? <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>{qty}</td>
                  </tr>
                : null
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Portfolio;
