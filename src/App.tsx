import "./App.css";

import React from "react";

import { Game } from "./components/Game";
import { EngineProvider } from "./state/EngineContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Phasekeeper-logo">10</div>
        <h4>Phasekeeper</h4>
      </header>
      <EngineProvider>
        <Game />
      </EngineProvider>
    </div>
  );
}

export default App;
