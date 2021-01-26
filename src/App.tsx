import React, { } from 'react';
import logo from './logo.svg';
import './App.css';
import { EngineProvider } from './EngineContext';
import { Game } from './Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Phasekeeper</h4>
      </header>
      <EngineProvider>
        <Game />
      </EngineProvider>
    </div>
  );
}
  
export default App;
