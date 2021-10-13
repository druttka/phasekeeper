import React, { useContext, useState } from "react";
import { standardPhases } from "../state";
import { EngineContext } from "../state/EngineContext";

export const RoundInProgress: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);

  return (
    <div>
      {players.map((p) => {
        const { playerId, name, completedPhase } = p;
        const displayName = name || `Player ${playerId}`;
        const nextPhase = standardPhases[completedPhase + 1];

        return (
          !!nextPhase && (
            <div key={`player-${p.playerId}`}>
              {displayName} needs{" "}
              {nextPhase.goals.reduce((agg, goal) => {
                const nextGoal = `a ${goal.goalType} of ${goal.successThreshold}`;
                return agg ? agg + ` and ${nextGoal}` : `${nextGoal}`;
              }, "")}
            </div>
          )
        );
      })}

      <button
        onClick={(e) => {
          actions?.endRound();
        }}
      >
        Go to scoring
      </button>
    </div>
  );
};
