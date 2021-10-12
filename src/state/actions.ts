import { Dispatch } from "react";

export type GameAction =
  | { type: "addPlayer"; data: { name?: string } }
  | { type: "start" }
  | { type: "endRound" }
  | { type: "adjustPhase"; data: { playerId: number; adjustment: 1 | -1 } }
  | { type: "adjustScore"; data: { playerId: number; adjustment: number } }
  | { type: "commitScores" }
  | { type: "reset" };

export const createActions = (
  dispatch: Dispatch<GameAction>
) => {
  return {
    addPlayer: (name?: string) =>
    dispatch({ type: "addPlayer", data: { name } }),
    start: () => dispatch({ type: "start" }),
    endRound: () => dispatch({ type: "endRound" }),
    adjustPhase: (playerId: number, adjustment: 1 | -1) => dispatch({ type: "adjustPhase", data: { playerId, adjustment } }),
    adjustScore: (playerId: number, adjustment: number) => dispatch({ type: "adjustScore", data: { playerId, adjustment } }),
    commitScores: () => dispatch({ type: "commitScores" }),
    reset: () => dispatch({ type: "reset" }),
  };
};
