import { EngineState } from "./EngineContext";

export const engineReducer = (state: EngineState, action: any): EngineState=> {
    console.log(action);
    
    if (action ==='sentinel') {
        const { gameState, isRoundInProgress } = state;
        switch (gameState) {
            case 'init':
                return {
                    ...state,
                    gameState: 'active',
                    hasGameStarted: true,
                    isRoundInProgress: true
                };
            case 'active':
                return {
                    ...state,
                    isRoundInProgress: !isRoundInProgress,
                    gameState: isRoundInProgress ? 'active' : 'complete',
                }
            case 'complete':
                return {
                    ...state,
                    gameState: 'init'
                }
        }
    }

    return state;
}