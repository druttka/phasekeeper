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
    adjustStagedScoring: (playerId: number, adjustment: number) =>
      dispatch({ type: "adjustStagedScoring", data: { playerId, adjustment } }),
    discardStagedScoreAdustments: (playerId: number) =>
      dispatch({ type: "discardStagedScoreAdustments", data: { playerId } }),
    commitScores: () => dispatch({ type: "commitScores" }),
    reset: () => dispatch({ type: "reset" }),
    removePlayer: (playerId: number) =>
      dispatch({ type: "removePlayer", data: { playerId } }),
    saveState: () => dispatch({ type: "saveGameState" }),
    clearSavedState: () => dispatch({ type: "clearSavedState" }),
    restoreSavedState: () => dispatch({ type: "restoreSavedState" }),
  };
};
