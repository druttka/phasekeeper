import React, { useContext } from "react";

import { PhaseDefintion, PlayerState, standardPhases } from "../state";
import { EngineContext } from "../state/EngineContext";

interface PhaseCardProps {
  phase: PhaseDefintion;
  players: PlayerState[];
  phaseView: "all" | "active";
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, players, phaseView }) => {
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
      <div className="PhaseCard-goal">{goalText}</div>
      <div className="PhaseCard-players">
        {players.map((p) => (
          <span className="PhaseCard-player">
            {p.name || `Player ${p.playerId}`} ({p.lastCommittedScore})
          </span>
        ))}
      </div>
    </div>
  );
};

export const RoundInProgress: React.FC = () => {
  const [{ players, phasesView }] = useContext(EngineContext);

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
        phase={phaseDefinition}
        phaseView={phasesView}
        players={playersByPhase[phaseIndex]}
      ></PhaseCard>
    );
  });

  return <div>{divs}</div>;
};
