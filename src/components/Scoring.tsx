import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { PlayerState } from "../state";
import { EngineContext } from "../state/EngineContext";

interface ScoreCardProps {
  player: PlayerState;
}

interface ScoreSliderProps {
  label: string;
  rangeValue: number;
  setRangeValueCb: Dispatch<SetStateAction<number>>;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({
  label,
  rangeValue,
  setRangeValueCb,
}) => {
  return (
    <div className="ScoreCard-slider">
      <span>{label}</span>
      <div>
        <input
          className="ScoreCard-range"
          type="range"
          min="0"
          max="10"
          step="1"
          onChange={(e) => {
            setRangeValueCb(+e.target.value);
          }}
          value={rangeValue}
        />
        <span>{rangeValue}</span>
      </div>
    </div>
  );
};

const ScoreCard: React.FC<ScoreCardProps> = ({ player }) => {
  const [, actions] = useContext(EngineContext);

  const [fives, setFives] = useState(0);
  const [tens, setTens] = useState(0);
  const [skips, setSkips] = useState(0);
  const [wilds, setWilds] = useState(0);
  const [completedPhase, setCompletedPhase] = useState(false);
  const { name, playerId, stagedScoreAdjustment } = player;

  useEffect(() => {
    const trueAdjustment = fives * 5 + tens * 10 + skips * 25 + wilds * 50;
    actions?.adjustStagedScoring(
      playerId,
      trueAdjustment - stagedScoreAdjustment
    );
    // Disabling since we're using this only to recalculate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fives, tens, skips, wilds]);

  const checkboxId = `phase-complete-${playerId}`;

  return (
    <div className="ScoreCard-container">
      <div key={`ScoreCard-player-${playerId}`} className="ScoreCard-player">
        <span>{name || `Player ${playerId}`}</span>
        <div>
          <label htmlFor={checkboxId}>Completed Phase?</label>
          <input
            id={checkboxId}
            type="checkbox"
            checked={completedPhase}
            onChange={(e) => {
              const { checked } = e.target;
              actions?.adjustPhase(playerId, checked ? 1 : -1);
              setCompletedPhase(checked);
            }}
          ></input>
        </div>
      </div>

      <ScoreSlider
        label="Cards 1-9"
        rangeValue={fives}
        setRangeValueCb={(x) => {
          setFives(x);
        }}
      />

      <ScoreSlider
        label="Cards 10-12"
        rangeValue={tens}
        setRangeValueCb={(x) => {
          setTens(x);
        }}
      />

      <ScoreSlider
        label="Skips"
        rangeValue={skips}
        setRangeValueCb={(x) => {
          setSkips(x);
        }}
      />

      <ScoreSlider
        label="Wilds"
        rangeValue={wilds}
        setRangeValueCb={(x) => {
          setWilds(x);
        }}
      />

      <span>Round score: {stagedScoreAdjustment}</span>
    </div>
  );
};
export const Scoring: React.FC = () => {
  const [{ players }, actions] = useContext(EngineContext);

  return (
    <div className="ScoreCards-container">
      {players.map((p) => (
        <ScoreCard key={`ScoreCard-${p.playerId}`} player={p} />
      ))}

      <button
        style={{ marginTop: 10 }}
        onClick={(e) => actions?.commitScores()}
      >
        Continue
      </button>
    </div>
  );
};
