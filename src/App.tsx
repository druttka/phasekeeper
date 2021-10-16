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
          <div className="Phasekeeper-logo">10</div>
          <h4>Phasekeeper</h4>
        </div>
        <div>
          See it on{" "}
          <a
            href="https://github.com/druttka/phasekeeper"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          !
        </div>
      </header>
      <EngineProvider>
        <Game />
      </EngineProvider>
    </div>
  );
}

export default App;
