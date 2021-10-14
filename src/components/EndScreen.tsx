import React, { useContext } from "react";

import { EngineContext } from "../state/EngineContext";

export const EndScreen: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);

  const winner = players
    .filter((p) => p.completedPhase === 10)
    .sort((a, b) => a.lastCommittedScore - b.lastCommittedScore)[0];

  return (
    <div>
      <h1>Congratulations {winner.name || `Player ${winner.playerId}`}!</h1>
      {players.map((p) => (
        <div>
          {p.name || `Player ${p.playerId}`} completed Phase {p.completedPhase}{" "}
          with {p.lastCommittedScore} points.
        </div>
      ))}
      <button
        style={{ marginTop: 10 }}
        onClick={(e) => {
          actions?.reset();
        }}
      >
        Play again!
      </button>
    </div>
  );
};