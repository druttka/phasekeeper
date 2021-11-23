export interface PlayerState {
  name?: string;
  playerId: number;
  completedPhase: number;
  lastCommittedScore: number;
  stagedScoreAdjustment: number;
}

export type GameState = "init" | "active" | "complete";

export type GameAction =
  | { type: "addPlayer"; data: { name?: string } }
  | { type: "start" }
  | { type: "endRound" }
  | { type: "adjustPhase"; data: { playerId: number; adjustment: 1 | -1 } }
  | {
      type: "adjustStagedScoring";
      data: { playerId: number; adjustment: number };
    }
  | { type: "discardStagedScoreAdustments"; data: { playerId: number } }
  | { type: "commitScores" }
  | { type: "removePlayer"; data: { playerId: number } }
  | { type: "saveGameState" }
  | { type: "restoreSavedState" }
  | { type: "clearSavedState" }
  | { type: "reset" };

export interface EngineState {
  gameState: GameState;
  players: PlayerState[];
  hasGameStarted: boolean;
  isRoundInProgress: boolean;
  phasesView: "all" | "active";
}

export type GoalType = "set" | "run" | "color-match";
export interface GoalDefintion {
  goalType: GoalType;
  successThreshold: number;
}

export interface PhaseDefintion {
  goals: GoalDefintion[];
}

export const standardPhases: PhaseDefintion[] = [
  {
    goals: [
      { goalType: "set", successThreshold: 3 },
      { goalType: "set", successThreshold: 3 },
    ],
  },
  {
    goals: [
      { goalType: "set", successThreshold: 3 },
      { goalType: "run", successThreshold: 4 },
    ],
  },
  {
    goals: [
      { goalType: "set", successThreshold: 4 },
      { goalType: "run", successThreshold: 4 },
    ],
  },
  { goals: [{ goalType: "run", successThreshold: 7 }] },
  { goals: [{ goalType: "run", successThreshold: 8 }] },
  { goals: [{ goalType: "run", successThreshold: 9 }] },
  {
    goals: [
      { goalType: "set", successThreshold: 4 },
      { goalType: "set", successThreshold: 4 },
    ],
  },
  { goals: [{ goalType: "color-match", successThreshold: 7 }] },
  {
    goals: [
      { goalType: "set", successThreshold: 5 },
      { goalType: "set", successThreshold: 2 },
    ],
  },
  {
    goals: [
      { goalType: "set", successThreshold: 5 },
      { goalType: "set", successThreshold: 3 },
    ],
  },
];
