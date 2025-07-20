import React from 'react';

function Portfolio({ cash }) {
  return (
    <section style={{ padding: '2rem' }}>
      <h2>Your Virtual Portfolio</h2>
      <p>Balance: ${cash.toLocaleString()}</p>
      {/* Holdings table will go here later */}
    </section>
  );
}

export default Portfolio;
