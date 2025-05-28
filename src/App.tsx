import { useState } from "react";
import { useMouseTracker } from "./components/MouseTracker";
import { normalize } from "./ml/normalize";
import { createModel, trainModel, evaluateConfidence } from "./ml/model";

function App() {
  const mouseData = useMouseTracker();
  const [confidence, setConfidence] = useState<number | null>(null);

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

      <button
        onClick={async () => {
          const norm = normalize(mouseData);

          console.log("Creating and training model...");
          const newModel = createModel();
          await trainModel(newModel, norm);

          console.log("Evaluating confidence...");
          const score = await evaluateConfidence(newModel, norm);
          setConfidence(score);
        }}
      >
        Normalize, Train, and Check Confidence
      </button>

      {confidence !== null && <p>Confidence: {confidence}%</p>}
    </div>
  );
}

export default App;
