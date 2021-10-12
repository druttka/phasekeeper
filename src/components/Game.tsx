import React, { useContext, useState } from 'react';
import { standardPhases } from '../state';
import { EngineContext } from '../state/EngineContext';

export const GameSetup: React.FC = () => {
    const [{players}, actions] = useContext(EngineContext);
    const [playerName, setPlayerName] = useState<string>('');

    const anyPlayersDefined = players && players.length > 0;

    return (
        <div>
            <div>Are you tired of finding pen and paper to track your scores while playing  <a href="https://www.mattelgames.com/en-us/cards/phase-10" rel="noreferrer" target="_blank">Phase 10</a>?</div>
            <div>Phasekeeper can help!</div>
            <div>To get started, let's add your players:</div>


            {anyPlayersDefined && (
                <div>
                    <div>Current Players:</div>
                    <div>
                        {players.map(p => <div key={`player-${p.playerId}`}>A player {p.name || p.playerId}</div>)}
                    </div>
                </div>
            )}


            <div>
                <input type="text" placeholder="new player" value={playerName} aria-label="Player Name" onChange={(e) => { setPlayerName(e?.target?.value)}}></input>
                <button onClick={e => { actions?.addPlayer(playerName)}}>Add player with name: </button>
            </div>

            <button onClick={e => { actions?.start()}}>Start the round!</button>
        </div>
    )
}

export const RoundInProgress: React.FC = () => {
    const [{players}, actions] = useContext(EngineContext);

    return (
        <div>
            {players.map(p => {
                const {playerId, name, completedPhase} = p;
                const displayName = name || `Player ${playerId}`;
                const nextPhase = standardPhases[completedPhase + 1];

                return !!nextPhase && (<div key={`player-${p.playerId}`} >{displayName} needs {nextPhase.goals.reduce((agg, goal) => {
                    const nextGoal = `a ${goal.goalType} of ${goal.successThreshold}`
                    return agg ? agg + ` and ${nextGoal}` : `${nextGoal}`;
                }, '')}</div>)
            })}

            <button onClick={e => {actions?.endRound()}}>Go to scoring</button>
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