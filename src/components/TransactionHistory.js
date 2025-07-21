import React from 'react';

function TransactionHistory({ transactions }) {
  return (
    <section style={{ padding: '2rem' }}>
      <h3>Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Symbol</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx}>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>{tx.type}</td>
                <td>{tx.symbol}</td>
                <td>{tx.qty}</td>
                <td>${tx.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionHistory;
