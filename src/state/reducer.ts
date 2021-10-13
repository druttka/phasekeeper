import { EngineState, GameAction, PlayerState } from "./models";

export const engineReducer = (
  state: EngineState,
  action: GameAction
): EngineState => {
  const { players } = state;

  switch (action.type) {
    case "addPlayer":
      console.log(`adding ${action.data.name}`);
      return {
        ...state,
        players: [
          ...players,
          {
            completedPhase: 0,
            lastCommittedScore: 0,
            stagedScoreAdjustment: 0,
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
        players: players.map((p) => ({
          ...p,
          completedPhase: 0,
          lastCommittedScore: 0,
          stagedScoreAdjustment: 0,
        })),
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

      console.log(`next players: ${JSON.stringify(nextPlayers)}`);

      return {
        ...state,
        players: nextPlayers,
      };
    }

    case "adjustStagedScoring": {
      const { adjustment, playerId } = action.data;
      return {
        ...state,
        players: players.map((p) =>
          p.playerId === playerId
            ? {
                ...p,
                stagedScoreAdjustment: p.stagedScoreAdjustment + adjustment,
              }
            : p
        ),
      };
    }

    case "discardStagedScoreAdustments": {
      const { playerId } = action.data;
      return {
        ...state,
        players: players.map((p) =>
          p.playerId === playerId ? { ...p, stagedScoreAdjustment: 0 } : p
        ),
      };
    }
    case "commitScores":
      const isGameOver = players.some((p) => p.completedPhase >= 10);
      console.log(`isGameOver: ${isGameOver}`);

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
