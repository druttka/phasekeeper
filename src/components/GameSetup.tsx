import React, { useContext, useState } from "react";

import { EngineContext } from "../state/EngineContext";

export const GameSetup: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);
  const [playerName, setPlayerName] = useState<string>("");

  const anyPlayersDefined = players && players.length > 0;

  return (
    <div>
      <div>
        Are you tired of finding pen and paper to track your scores while
        playing
        <a
          href="https://www.mattelgames.com/en-us/cards/phase-10"
          rel="noreferrer"
          target="_blank"
        >
          Phase 10
        </a>
        ?
      </div>
      <div>Phasekeeper can help!</div>
      <div>To get started, let's add your players:</div>

      {anyPlayersDefined && (
        <div>
          <div>Current Players:</div>
          <div>
            {players.map((p) => (
              <div key={`player-${p.playerId}`}>
                A player {p.name || p.playerId}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="new player"
          value={playerName}
          aria-label="Player Name"
          onChange={(e) => {
            setPlayerName(e?.target?.value);
          }}
        ></input>
        <button
          onClick={(e) => {
            actions?.addPlayer(playerName);
          }}
        >
          Add player with name:{" "}
        </button>
      </div>

      <button
        onClick={(e) => {
          actions?.start();
        }}
      >
        Start the round!
      </button>
    </div>
  );
};
