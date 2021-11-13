import React, { useContext } from "react";

import { EngineContext } from "../state/EngineContext";

export const EndScreen: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);

  if (players.length < 1) {
    return (
      <div data-testid="error-view">
        <h1>
          Whoops. Looks like we got here without any players... Where'd
          everybody go?
        </h1>
      </div>
    );
  }

  const sortedPlayers = players.sort((a, b) => {
    if (a.completedPhase > b.completedPhase) return 1;
    if (b.completedPhase > a.completedPhase) return -1;
    return a.lastCommittedScore - b.lastCommittedScore;
  });

  const winner = sortedPlayers[0];

  return (
    <div>
      <h1 data-testid="text-congrats">
        Congratulations {winner.name || `Player ${winner.playerId}`}!
      </h1>
      {sortedPlayers.map((p) => (
        <div
          key={`player-outcome-${p.playerId}`}
          data-testid="text-player-outcome"
        >
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
