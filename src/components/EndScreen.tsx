import React, { useContext } from "react";

import { EngineContext } from "../state/EngineContext";

export const EndScreen: React.FC = () => {
  const [, actions] = useContext(EngineContext);
  return (
    <div
      onClick={(e) => {
        actions?.reset();
      }}
    >
      TODO: UI for end screen (for now, click here to reset the game)
    </div>
  );
};
