import React, { useContext, useEffect } from 'react';
import { EngineContext } from './EngineContext';

export const GameSetup: React.FC = () => {
    const [state, dispatch] = useContext(EngineContext);
    return <div>Game setup</div>
}

export const RoundInProgress: React.FC = () => {
    const [state, dispatch] = useContext(EngineContext);
    return <div>Round in progress...</div>
}

export const RoundScoring: React.FC = () => {
    const [state, dispatch] = useContext(EngineContext);
    return <div>Enter scores</div>
}

export const GameComplete: React.FC = () => {
    const [state, dispatch] = useContext(EngineContext);
    return <div>Congratulations!</div>
}

export const Game:React.FC = () => {
    const [state, dispatch] = useContext(EngineContext);

    useEffect(()=>{
        setInterval(()=>{
            dispatch('sentinel');
        }, 1000);    
    }, []);
    
    switch(state.gameState) {
        case 'init':
            return <GameSetup />;
        case 'active':
            return state.isRoundInProgress ? <RoundInProgress /> : <RoundScoring />;
        case 'complete':
            return <GameComplete />;
    }
}