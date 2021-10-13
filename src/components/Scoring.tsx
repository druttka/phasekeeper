import React, { useContext, useState } from "react";
import { standardPhases } from "../state";
import { EngineContext } from "../state/EngineContext";

export const Scoring: React.FC = () => {
  const [state, actions] = useContext(EngineContext);
  return (
    <div
      onClick={(e) => {
        state.players.forEach((p) => actions?.adjustPhase(p.playerId, 1));
        actions?.commitScores();
      }}
    >
      TODO: UI to enter score and phase adjustments (for now, click here to move
      everyone up a phase and start next round)
    </div>
  );
};
