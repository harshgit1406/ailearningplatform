import { useState } from "react";
import { Play } from "lucide-react";

export function ForwardPropagation() {
  const [input, setInput] = useState(5);
  const [weight1, setWeight1] = useState(0.5);
  const [weight2, setWeight2] = useState(0.8);
  const [bias, setBias] = useState(0.2);
  const [isAnimating, setIsAnimating] = useState(false);

  const hidden = input * weight1 + bias;
  const output = hidden * weight2;

  const runAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Forward Propagation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Forward propagation is the process by which input data is passed through the layers of a neural network to generate an output. Each neuron applies weights, biases, and activation functions to the input.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Input Layer:</b> Receives the raw data.</li>
          <li><b>Hidden Layers:</b> Transform the data through learned weights and activation functions.</li>
          <li><b>Output Layer:</b> Produces the final prediction.</li>
        </ul>
        <br/>
        <b>Example:</b> In image classification, forward propagation computes the probability of each class for a given image.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Network Parameters</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Value: {input.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={input}
                onChange={(e) => setInput(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight 1: {weight1.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={weight1}
                onChange={(e) => setWeight1(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight 2: {weight2.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={weight2}
                onChange={(e) => setWeight2(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bias: {bias.toFixed(2)}
              </label>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                value={bias}
                onChange={(e) => setBias(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={runAnimation}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Run Forward Pass
            </button>
          </div>

          {/* Calculations */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Calculations</h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Hidden:</span>
                <span className="text-blue-600">{input.toFixed(2)} × {weight1.toFixed(2)} + {bias.toFixed(2)} = {hidden.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Output:</span>
                <span className="text-green-600">{hidden.toFixed(2)} × {weight2.toFixed(2)} = {output.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Data Flow Visualization</h2>

          <svg width="100%" height="400" className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Input Node */}
            <g>
              <circle cx="80" cy="200" r="30" fill="#3B82F6" className={isAnimating ? "animate-pulse" : ""} />
              <text x="80" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                {input.toFixed(1)}
              </text>
              <text x="80" y="260" textAnchor="middle" fill="#374151" fontSize="12">Input</text>
            </g>

            {/* Hidden Node */}
            <g>
              <line x1="110" y1="200" x2="220" y2="200" stroke="#3B82F6" strokeWidth="2" className={isAnimating ? "animate-pulse" : ""} />
              <text x="165" y="190" textAnchor="middle" fill="#3B82F6" fontSize="11">w1={weight1.toFixed(1)}</text>

              <circle cx="250" cy="200" r="30" fill="#10B981" className={isAnimating ? "animate-pulse" : ""} />
              <text x="250" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                {hidden.toFixed(1)}
              </text>
              <text x="250" y="260" textAnchor="middle" fill="#374151" fontSize="12">Hidden</text>
            </g>

            {/* Output Node */}
            <g>
              <line x1="280" y1="200" x2="390" y2="200" stroke="#10B981" strokeWidth="2" className={isAnimating ? "animate-pulse" : ""} />
              <text x="335" y="190" textAnchor="middle" fill="#10B981" fontSize="11">w2={weight2.toFixed(1)}</text>

              <circle cx="420" cy="200" r="30" fill="#8B5CF6" className={isAnimating ? "animate-pulse" : ""} />
              <text x="420" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                {output.toFixed(1)}
              </text>
              <text x="420" y="260" textAnchor="middle" fill="#374151" fontSize="12">Output</text>
            </g>

            {/* Bias indicator */}
            <g>
              <circle cx="250" cy="120" r="15" fill="#F59E0B" opacity="0.8" />
              <text x="250" y="125" textAnchor="middle" fill="white" fontSize="10">b</text>
              <line x1="250" y1="135" x2="250" y2="170" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,3" />
            </g>
          </svg>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Process Steps</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">1</span>
                <span>Input value enters the network</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">2</span>
                <span>Multiply by weight and add bias at hidden layer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs">3</span>
                <span>Hidden value multiplied by second weight to produce output</span>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Temperature Prediction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">
              Forward propagation is used in weather forecasting models to predict temperatures based on various input features.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Current Temperature:</span>
                  <span className="font-semibold text-blue-600">72°F</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Humidity:</span>
                  <span className="font-semibold text-blue-600">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Wind Speed:</span>
                  <span className="font-semibold text-blue-600">12 mph</span>
                </div>
                <div className="border-t border-blue-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Predicted Temperature:</span>
                    <span className="font-bold text-green-600">75°F</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🌡️</div>
              <p className="text-gray-700 font-medium">Neural network processes input features through forward propagation to make predictions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
