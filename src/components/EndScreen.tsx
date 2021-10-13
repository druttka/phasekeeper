import React, { useContext, useState } from "react";

import { standardPhases } from "../state";
import { EngineContext } from "../state/EngineContext";

export const EndScreen: React.FC = () => {
  const [state, actions] = useContext(EngineContext);
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
