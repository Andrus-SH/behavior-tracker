# Behavior Tracker — Mouse Movement & User Confidence Model

This React app captures real user mouse movement behavior, trains a simple TensorFlow.js model in the browser, and outputs a confidence score indicating whether new mouse data matches the initial user pattern.

---

## Features

- **Live mouse tracking** of movement speeds (`px/s`).
- **Normalize** mouse speed data (scaled 0–1).
- **Train a TensorFlow.js model** entirely in the browser.
- **Calculate and display confidence score** (0–100%) comparing new data to initial behavior.
- Simple UI with:
  - Live data feed showing recent mouse speeds.
  - One button that normalizes data, trains the model, and shows confidence.

---

## How to Run

1. Clone the repo:

```bash
git clone https://github.com/Andrus-SH/behavior-tracker.git
cd behavior-tracker

npm install

npm run dev