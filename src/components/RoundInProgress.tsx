import React, { useContext } from "react";

import { PhaseDefintion, PlayerState, standardPhases } from "../state";
import { EngineContext } from "../state/EngineContext";

interface PhaseCardProps {
  phase: PhaseDefintion;
  phaseIndex: number;
  players: PlayerState[];
  phaseView: "all" | "active";
}

const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  phaseIndex,
  players,
  phaseView,
}) => {
  const doesPhaseHavePlayers = players && players.length > 0;

  if (phaseView === "active" && !doesPhaseHavePlayers) {
    return null;
  }

  const goalText = phase.goals.reduce((agg, goal) => {
    const nextGoal = `a ${goal.goalType} of ${goal.successThreshold}`;
    return agg ? agg + ` and ${nextGoal}` : `${nextGoal}`;
  }, "");

  return (
    <div className="PhaseCard-container">
      <span className="RoundInProgress-phase-indicator">{phaseIndex + 1}</span>
      <div className="PhaseCard-players">
        {players.map((p) => (
          <span
            key={`PhaseCard-player-${p.playerId}`}
            className="PhaseCard-player"
          >
            {p.name || `Player ${p.playerId}`} ({p.lastCommittedScore})
          </span>
        ))}
      </div>
      <div className="PhaseCard-goal">{goalText}</div>
    </div>
  );
};

export const RoundInProgress: React.FC = () => {
  const [{ players, phasesView }, actions] = useContext(EngineContext);

  const playersByPhase = players.reduce<Record<number, PlayerState[]>>(
    (agg, p) => {
      const targetPhase = p.completedPhase;
      const nextPlayers = [...(agg[targetPhase] || []), p];

      return {
        ...agg,
        [targetPhase]: nextPlayers,
      };
    },
    {}
  );

  const divs = standardPhases.map((phaseDefinition, phaseIndex) => {
    return (
      <PhaseCard
        key={`phaseCard-${phaseIndex}`}
        phase={phaseDefinition}
        phaseIndex={phaseIndex}
        phaseView={phasesView}
        players={playersByPhase[phaseIndex]}
      ></PhaseCard>
    );
  });

  return (
    <div>
      {divs}
      <button
        style={{ marginTop: 10 }}
        className="action-button"
        onClick={(e) => {
          actions?.endRound();
        }}
      >
        Next Phase
      </button>
    </div>
  );
};
