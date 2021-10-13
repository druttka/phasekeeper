import React, { useContext } from "react";

import { EngineContext } from "../state/EngineContext";
import { EndScreen } from "./EndScreen";
import { GameSetup } from "./GameSetup";
import { RoundInProgress } from "./RoundInProgress";
import { Scoring } from "./Scoring";

export const Game: React.FC = () => {
  const [state] = useContext(EngineContext);

  const scene = (function () {
    switch (state.gameState) {
      case "init":
        return <GameSetup />;
      case "active":
        return state.isRoundInProgress ? <RoundInProgress /> : <Scoring />;
      case "complete":
        return <EndScreen />;
    }
  })();

  return <div className="Game-view">{scene}</div>;
};
