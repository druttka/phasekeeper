import React, { useContext } from 'react';
import { EngineContext } from '../state/EngineContext';

export const GameSetup: React.FC = () => {
    const [state, actions] = useContext(EngineContext);
    
    return (
        <div>
            {state.players.map(p => <div>A player {p.playerId}</div>)}
            <div onClick={e => { actions?.addPlayer()}}>TODO: UI to add players (for now, click here to simulate)</div>
            <div onClick={e => { actions?.start()}}>Start the round!</div>
        </div>
    )
}

export const RoundInProgress: React.FC = () => {
    const [state, actions] = useContext(EngineContext);

    return (
        <div>
            {state.players.map(p => (<div>Player {p.playerId} has completed Phase {p.completedPhase}</div>))}
            <div onClick={e => {actions?.endRound()}}>TODO: Round in progress, render current player phases (for now, click here to end round)</div>
        </div>
    )
}

export const RoundScoring: React.FC = () => {
    const [state, actions] = useContext(EngineContext);
    return <div onClick={e => {
        state.players.forEach(p => actions?.adjustPhase(p.playerId, 1));
        actions?.commitScores();
    }}>TODO: UI to enter score and phase adjustments (for now, click here to move everyone up a phase and start next round)</div>
}

export const GameComplete: React.FC = () => {
    const [state, actions] = useContext(EngineContext);
    return <div onClick={e => {actions?.reset()}}>TODO: UI for end screen (for now, click here to reset the game)</div>
}

export const Game:React.FC = () => {
    const [state] = useContext(EngineContext);

    switch(state.gameState) {
        case 'init':
            return <GameSetup />;
        case 'active':
            return state.isRoundInProgress ? <RoundInProgress /> : <RoundScoring />;
        case 'complete':
            return <GameComplete />;
    }
}