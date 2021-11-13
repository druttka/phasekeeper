import { render, screen } from "@testing-library/react";
import React from "react";

import { EngineProvider } from "../state";
import { EndScreen } from "./EndScreen";

describe("EndScreen", () => {
  describe("with no players", () => {
    test("it renders an error view", () => {
      const { getByTestId } = render(
        <EngineProvider
          initialState={{
            gameState: "complete",
            hasGameStarted: true,
            isRoundInProgress: false,
            phasesView: "active",
            players: [],
          }}
        >
          <EndScreen />
        </EngineProvider>
      );

      const errorText = getByTestId("error-view");
      expect(errorText).toHaveTextContent("Whoops");
    });
  });
});
