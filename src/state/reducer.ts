import {
  EngineState,
  GameAction,
  LocalStorageKeyForSavedState,
} from "./models";

type EngineReducer = (state: EngineState, action: GameAction) => EngineState;

const addPlayer: EngineReducer = (state, action) => {
  if (action.type !== "addPlayer") return state;

  const { players } = state;

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
};

const start: EngineReducer = (state, action) => {
  if (action.type !== "start") return state;

  const { players } = state;

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
};

const removePlayer: EngineReducer = (state, action) => {
  if (action.type !== "removePlayer") return state;

  const { players } = state;

  return {
    ...state,
    players: players.filter((p) => p.playerId !== action.data.playerId),
  };
};

const endRound: EngineReducer = (state) => {
  return {
    ...state,
    isRoundInProgress: false,
  };
};

const adjustPhase: EngineReducer = (state, action) => {
  if (action.type !== "adjustPhase") return state;

  const { players } = state;

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
};

const adjustStagedScoring: EngineReducer = (state, action) => {
  if (action.type !== "adjustStagedScoring") return state;

  const { players } = state;

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
};

const discardStagedScoreAdustments: EngineReducer = (state, action) => {
  if (action.type !== "discardStagedScoreAdustments") return state;

  const { players } = state;
  const { playerId } = action.data;

  return {
    ...state,
    players: players.map((p) =>
      p.playerId === playerId ? { ...p, stagedScoreAdjustment: 0 } : p
    ),
  };
};
const commitScores: EngineReducer = (state, action) => {
  if (action.type !== "commitScores") return state;

  const { players } = state;

  const isGameOver = players.some((p) => p.completedPhase >= 10);
  const nextPlayers = players.map((p) => ({
    ...p,
    lastCommittedScore: p.lastCommittedScore + p.stagedScoreAdjustment,
    stagedScoreAdjustment: 0,
  }));

  return isGameOver
    ? {
        ...state,
        gameState: "complete",
        players: nextPlayers,
      }
    : {
        ...state,
        isRoundInProgress: true,
        players: nextPlayers,
      };
};

const reset: EngineReducer = (state, action) => {
  if (action.type !== "reset") return state;

  const { players } = state;

  return {
    gameState: "init",
    hasGameStarted: false,
    isRoundInProgress: false,
    players: players,
    phasesView: state.phasesView,
  };
};

const restoreSavedState: EngineReducer = (state, action) => {
  if (action.type !== "restoreSavedState") return state;

  const savedState = localStorage.getItem(LocalStorageKeyForSavedState);
  return savedState ? JSON.parse(savedState) : state;
};

const saveGameState: EngineReducer = (state, action) => {
  if (action.type !== "saveGameState") return state;

  localStorage.setItem(LocalStorageKeyForSavedState, JSON.stringify(state));
  return state;
};

const clearSavedState: EngineReducer = (state, action) => {
  if (action.type !== "clearSavedState") return state;
  localStorage.removeItem(LocalStorageKeyForSavedState);
  return state;
};

const reducerFns: Record<GameAction["type"], EngineReducer> = {
  addPlayer: addPlayer,
  adjustPhase: adjustPhase,
  commitScores: commitScores,
  adjustStagedScoring: adjustStagedScoring,
  discardStagedScoreAdustments: discardStagedScoreAdustments,
  endRound: endRound,
  removePlayer: removePlayer,
  reset: reset,
  restoreSavedState: restoreSavedState,
  saveGameState: saveGameState,
  clearSavedState: clearSavedState,
  start: start,
};

export const engineReducer = (
  state: EngineState,
  action: GameAction
): EngineState => {
  const fn = reducerFns[action.type];
  return fn ? fn(state, action) : state;
};
