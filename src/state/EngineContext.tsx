import React, {createContext, useReducer} from 'react';
import { createActions } from './actions';
import { engineReducer } from './reducer';

export interface PlayerState {
    name?: string;
    playerId: number;
    completedPhase: number;
    score: number;
}

export type GameState = 'init' | 'active' | 'complete';

export interface EngineState  {
    gameState: GameState;
    players: PlayerState[];
    hasGameStarted: boolean;
    isRoundInProgress: boolean;
};

const defaultEngineState:EngineState = {
    gameState: 'init',
    players: [],
    hasGameStarted: false,
    isRoundInProgress: false
}

export const EngineContext = createContext<[EngineState, ReturnType<typeof createActions>?]>([defaultEngineState, undefined]);

export const EngineProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(engineReducer, defaultEngineState);
    const actions = createActions(dispatch);
    
    return (
        <EngineContext.Provider value={[state, actions]}>
            {children}
        </EngineContext.Provider>
    );
}