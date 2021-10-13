import { Dispatch } from "react";
import { GameAction } from "./models";

export const createActions = (dispatch: Dispatch<GameAction>) => {
  return {
    addPlayer: (name?: string) =>
      dispatch({ type: "addPlayer", data: { name } }),
    start: () => dispatch({ type: "start" }),
    endRound: () => dispatch({ type: "endRound" }),
    adjustPhase: (playerId: number, adjustment: 1 | -1) =>
      dispatch({ type: "adjustPhase", data: { playerId, adjustment } }),
    adjustScore: (playerId: number, adjustment: number) =>
      dispatch({ type: "adjustScore", data: { playerId, adjustment } }),
    commitScores: () => dispatch({ type: "commitScores" }),
    reset: () => dispatch({ type: "reset" }),
  };
};
