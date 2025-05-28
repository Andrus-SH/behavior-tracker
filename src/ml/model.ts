import * as tf from "@tensorflow/tfjs";

export const createModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [1], units: 10, activation: "relu" })
  );
  model.add(tf.layers.dense({ units: 5, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({ optimizer: "adam", loss: "binaryCrossentropy" });
  return model;
};

export const trainModel = async (model: tf.Sequential, data: number[][]) => {
  const xs = tf.tensor2d(data);
  const ys = tf.tensor2d(new Array(data.length).fill([1])); // baseline = label 1

  await model.fit(xs, ys, {
    epochs: 20,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(`Epoch ${epoch}: loss = ${logs?.loss}`),
    },
  });
};

export const evaluateConfidence = async (
  model: tf.Sequential,
  newData: number[][]
): Promise<number> => {
  const xs = tf.tensor2d(newData);
  const prediction = (await model.predict(xs)) as tf.Tensor;
  const result = await prediction.array();
  const arr = result as number[][];
  const confidence = arr.reduce((acc, val) => acc + val[0], 0) / arr.length;
  return Math.round(confidence * 100); // scale to 0–100%
};
