import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { NeuralNetwork } from "./components/topics/NeuralNetwork";
import { ForwardPropagation } from "./components/topics/ForwardPropagation";
import { BackwardPropagation } from "./components/topics/BackwardPropagation";
import { CNN } from "./components/topics/CNN";
import { RNN } from "./components/topics/RNN";
import { LSTM } from "./components/topics/LSTM";
import { HopfieldNetwork } from "./components/topics/HopfieldNetwork";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "neural-network", Component: NeuralNetwork },
      { path: "forward-propagation", Component: ForwardPropagation },
      { path: "backward-propagation", Component: BackwardPropagation },
      { path: "cnn", Component: CNN },
      { path: "rnn", Component: RNN },
      { path: "lstm", Component: LSTM },
      { path: "hopfield-network", Component: HopfieldNetwork },
    ],
  },
]);
