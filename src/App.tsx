import "./App.css";

import React from "react";

import { Game } from "./components/Game";
import logo from "./logo.svg";
import { EngineProvider } from "./state/EngineContext";

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
