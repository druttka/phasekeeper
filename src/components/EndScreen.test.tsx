import { render, screen } from "@testing-library/react";
import React from "react";

import { EngineProvider, EngineState, PlayerState } from "../state";
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

  describe("with all players completing Phase 10", () => {
    let state: EngineState;

    const createFinishedPlayerState = (
      id: number,
      score: number
    ): PlayerState => ({
      completedPhase: 10,
      lastCommittedScore: score,
      playerId: id,
      name: `Player ${id}`,
      stagedScoreAdjustment: 0,
    });

    beforeEach(() => {
      state = {
        gameState: "complete",
        hasGameStarted: true,
        isRoundInProgress: false,
        phasesView: "active",
        players: [
          createFinishedPlayerState(1, 25),
          createFinishedPlayerState(2, 50),
          createFinishedPlayerState(3, 10),
        ],
      };
    });

    test("has congratulations text", () => {
      const { getByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const congratulationsText = getByTestId("text-congrats");
      expect(congratulationsText).toHaveTextContent("Congratulations");
    });

    test("congratulates the player with the lowest score", () => {
      const { getByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const congratulationsText = getByTestId("text-congrats");
      expect(congratulationsText).toHaveTextContent("Player 3");
    });

    test("lists all players", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes).toHaveLength(3);
    });

    test("lists the winner first", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes[0]).toHaveTextContent(`Player 3`);
    });

    test("lists the other players in descending score order", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes[1]).toHaveTextContent(`Player 1`);
      expect(playerOutcomes[2]).toHaveTextContent(`Player 2`);
    });
  });

  describe("with only some players completing Phase 10", () => {
    let state: EngineState;

    const createFinishedPlayerState = (
      id: number,
      completedPhase: number,
      score: number
    ): PlayerState => ({
      completedPhase: completedPhase,
      lastCommittedScore: score,
      playerId: id,
      name: `Player ${id}`,
      stagedScoreAdjustment: 0,
    });

    beforeEach(() => {
      state = {
        gameState: "complete",
        hasGameStarted: true,
        isRoundInProgress: false,
        phasesView: "active",
        players: [
          createFinishedPlayerState(1, 9, 25),
          createFinishedPlayerState(2, 10, 50),
          createFinishedPlayerState(3, 9, 10),
        ],
      };
    });

    test("has congratulations text", () => {
      const { getByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const congratulationsText = getByTestId("text-congrats");
      expect(congratulationsText).toHaveTextContent("Congratulations");
    });

    test("congratulates the player with the lowest score", () => {
      const { getByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const congratulationsText = getByTestId("text-congrats");
      expect(congratulationsText).toHaveTextContent("Player 2");
    });

    test("lists all players", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes).toHaveLength(3);
    });

    test("lists the winner first", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes[0]).toHaveTextContent(`Player 2`);
    });

    test("lists the other players in descending score order", () => {
      const { getAllByTestId } = render(
        <EngineProvider initialState={state}>
          <EndScreen />
        </EngineProvider>
      );

      const playerOutcomes = getAllByTestId("text-player-outcome");
      expect(playerOutcomes[1]).toHaveTextContent(`Player 3`);
      expect(playerOutcomes[2]).toHaveTextContent(`Player 1`);
    });
  });
});
