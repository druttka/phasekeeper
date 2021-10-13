import React, { useContext, useState } from "react";

import { EngineContext } from "../state/EngineContext";

const Roster: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);
  const [playerName, setPlayerName] = useState<string>("");

  const anyPlayersDefined = players && players.length > 0;

  return (
    <div className="Roster-container">
      <div className="Roster-heading">Players:</div>

      {anyPlayersDefined && (
        <div className="Roster-players">
          {players.map((p) => (
            <div className="Roster-player" key={`player-${p.playerId}`}>
              {p.name || p.playerId}
              <span
                className="Roster-remove"
                onClick={(e) => {
                  actions?.removePlayer(p.playerId);
                }}
              >
                X
              </span>
            </div>
          ))}
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              actions?.addPlayer(playerName);
              setPlayerName("");
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export const GameSetup: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);

  const hasAtLeastTwoPlayers = players && players.length > 1;

  return (
    <div>
      <div className="Game-setup-instruction">
        Tired of pen and paper? Let Phasekeeper track your game of{" "}
        <a
          href="https://www.mattelgames.com/en-us/cards/phase-10"
          rel="noreferrer"
          target="_blank"
        >
          Phase 10
        </a>
        !
      </div>
      <div className="Game-setup-instruction">
        To get started, let's add your players.
      </div>

      <Roster />

      <button
        disabled={!hasAtLeastTwoPlayers}
        onClick={(e) => {
          actions?.start();
        }}
      >
        Let's play!
      </button>
    </div>
  );
};
