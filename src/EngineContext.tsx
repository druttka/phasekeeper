import React, {createContext, Dispatch, useReducer} from 'react';
import { engineReducer } from './reducer';

export interface PlayerState {
    phaseIndex: number;
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

export const EngineContext = createContext<[EngineState, Dispatch<any>]>([defaultEngineState, s=>s]);

export const EngineProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(engineReducer, defaultEngineState);
    
    return (
        <EngineContext.Provider value={[state, dispatch]}>
            {children}
        </EngineContext.Provider>
    );
}