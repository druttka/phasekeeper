import React, { createContext, useReducer } from "react";

import { createActions } from "./actions";
import { EngineState } from "./models";
import { engineReducer } from "./reducer";

const defaultEngineState: EngineState = {
  gameState: "init",
  players: [],
  hasGameStarted: false,
  isRoundInProgress: false,
  phasesView: "active",
};

export const EngineContext = createContext<
  [EngineState, ReturnType<typeof createActions>?]
>([defaultEngineState, undefined]);

export const EngineProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(engineReducer, defaultEngineState);
  const actions = createActions(dispatch);

  return (
    <EngineContext.Provider value={[state, actions]}>
      {children}
    </EngineContext.Provider>
  );
};
