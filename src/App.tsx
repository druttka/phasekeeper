import "./App.css";

import React from "react";

import { Game } from "./components/Game";
import { EngineProvider } from "./state/EngineContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            className="Phasekeeper-logo"
            src="/logo512-transparent.png"
            alt="Phasekeeper logo"
          />
          <h4>Phasekeeper</h4>
        </div>
      </header>
      <div className="App-main">
        <EngineProvider>
          <Game />
        </EngineProvider>
      </div>
      <footer className="App-footer">
        <div className="App-footer-install-hint">
          Consider using "Add to Home Screen" to install this free application
          instead of bookmarking the site in your browser!
        </div>
      </footer>
    </div>
  );
}

export default App;
