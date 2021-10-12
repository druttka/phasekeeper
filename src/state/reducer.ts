import { GameAction } from "./actions";
import { EngineState } from "./EngineContext";

export const engineReducer = (
  state: EngineState,
  action: GameAction
): EngineState => {
  const { players } = state;

  switch (action.type) {
    case "addPlayer":
      return {
        ...state,
        players: [
          ...players,
          {
            completedPhase: 0,
            score: 0,
            playerId: players.length,
            name: action.data.name,
          },
        ],
      };
    case "start":
      return {
        ...state,
        gameState: "active",
        hasGameStarted: true,
        isRoundInProgress: true,
      };
    case "endRound":
      return {
        ...state,
        isRoundInProgress: false,
      };
    case "adjustPhase": {
      const { adjustment, playerId } = action.data;
      const nextPlayers = players.map((p) =>
        p.playerId !== playerId
          ? p
          : { ...p, completedPhase: p.completedPhase + adjustment }
      );
      return {
        ...state,
        players: nextPlayers,
      };
    }
    case "adjustScore": {
      const { adjustment, playerId } = action.data;
      const nextPlayers = players.map((p) =>
        p.playerId !== playerId ? p : { ...p, score: p.score + adjustment }
      );
      return {
        ...state,
        players: nextPlayers,
      };
    }
    case "commitScores":
      const isGameOver = players.some((p) => p.completedPhase >= 10);
      return isGameOver
        ? {
            ...state,
            gameState: "complete",
          }
        : {
            ...state,
            isRoundInProgress: true,
          };
    case "reset":
      return {
        gameState: "init",
        hasGameStarted: false,
        isRoundInProgress: false,
        players: players,
      };
    default:
      return state;
  }
};
