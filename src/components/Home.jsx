import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Hahow Interview</h1>
      <p>Click the following link to start your game</p>
      <ul>
        <li><Link to="/heroes">Hero Fantasy</Link></li>
      </ul>
    </>
  );
}

export default Home;
