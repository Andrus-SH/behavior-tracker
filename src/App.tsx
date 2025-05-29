import * as tf from "@tensorflow/tfjs";
import { useState } from "react";
import { useMouseTracker } from "./components/MouseTracker";
import { normalize } from "./ml/normalize";
import { createModel, trainModel, evaluateConfidence } from "./ml/model";

function App() {
  const mouseData = useMouseTracker();
  const [confidence, setConfidence] = useState<number | null>(null);
  const [baselineData, setBaselineData] = useState<number[][] | null>(null);
  const [trainedModel, setTrainedModel] = useState<tf.Sequential | null>(
    null
  );
  const [isBaselineEstablished, setIsBaselineEstablished] =
    useState<boolean>(false);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>User Behavior Confidence Checker</h2>

      <h4>
        Recent mouse speeds: [
        {mouseData.map(
          (d, i) =>
            `${Math.round(d.speed)}px/s${i < mouseData.length - 1 ? ", " : ""}`
        )}
        ]
      </h4>

      {isBaselineEstablished ? (
        <button
          onClick={async () => {
            if (!trainedModel) {
              console.error("Error: Baseline model not found.");
              return;
            }
            const newNormalizedData = normalize(mouseData);
            console.log(
              "Checking confidence: New normalized data:",
              newNormalizedData
            );
            console.log("Evaluating confidence against baseline model...");
            const score = await evaluateConfidence(
              trainedModel,
              newNormalizedData
            );
            setConfidence(score);
            console.log("Confidence score:", score);
          }}
        >
          Check Confidence
        </button>
      ) : (
        <button
          onClick={async () => {
            const currentNormalizedData = normalize(mouseData);
            setBaselineData(currentNormalizedData);
            console.log(
              "Establishing baseline: Normalized data:",
              currentNormalizedData
            );
            const newModel = createModel();
            console.log("Training baseline model...");
            await trainModel(newModel, currentNormalizedData);
            console.log("Baseline model trained.");
            setTrainedModel(newModel);
            setIsBaselineEstablished(true);
            setConfidence(null);
          }}
        >
          Establish Baseline
        </button>
      )}

      {confidence !== null && <p>Confidence: {confidence}%</p>}
    </div>
  );
}

export default App;
