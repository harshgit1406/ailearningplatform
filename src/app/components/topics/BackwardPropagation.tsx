import { useState } from "react";
import { RotateCcw } from "lucide-react";

export function BackwardPropagation() {
  const [learningRate, setLearningRate] = useState(0.1);
  const [error, setError] = useState(2.5);
  const [epoch, setEpoch] = useState(0);

  const runBackprop = () => {
    setEpoch((prev) => prev + 1);
    setError((prev) => Math.max(0.1, prev * 0.8));
  };

  const reset = () => {
    setEpoch(0);
    setError(2.5);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Backward Propagation</h1>
      <p className="text-lg text-gray-600 mb-8">
        Backward propagation (backpropagation) is the key algorithm for training neural networks. It calculates the gradient of the loss function with respect to each weight by applying the chain rule, allowing the network to update its weights to minimize error.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Loss Function:</b> Measures how well the network's predictions match the target values.</li>
          <li><b>Gradient Descent:</b> Optimization algorithm that updates weights to minimize the loss.</li>
        </ul>
        <br/>
        <b>Example:</b> Backpropagation is used in all modern deep learning frameworks to train models efficiently.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Training Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Training Controls</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Rate: {learningRate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.01"
                max="1"
                step="0.01"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Controls how quickly the network learns</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Current Epoch:</span>
                <span className="text-2xl font-bold text-blue-600">{epoch}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Error:</span>
                <span className="text-2xl font-bold text-red-600">{error.toFixed(3)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={runBackprop}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Train 1 Epoch
              </button>
              <button
                onClick={reset}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Chart */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Error Over Time</h3>
            <div className="h-40 bg-gray-50 rounded-lg border border-gray-200 p-4 relative">
              <svg width="100%" height="100%">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={`${i * 25}%`}
                    x2="100%"
                    y2={`${i * 25}%`}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                  />
                ))}

                {/* Error line */}
                <polyline
                  points={`0,80 ${epoch > 0 ? Math.min(epoch * 20, 100) : 0},${100 - error * 30}`}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Gradient Flow</h2>

          <svg width="100%" height="400" className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Forward pass (lighter) */}
            <g opacity="0.3">
              <line x1="80" y1="200" x2="220" y2="200" stroke="#3B82F6" strokeWidth="2" />
              <line x1="250" y1="200" x2="390" y2="200" stroke="#3B82F6" strokeWidth="2" />
            </g>

            {/* Backward pass (highlighted) */}
            <g>
              <line
                x1="390"
                y1="210"
                x2="250"
                y2="210"
                stroke="#EF4444"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1="220"
                y1="210"
                x2="80"
                y2="210"
                stroke="#EF4444"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
              />
            </g>

            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#EF4444" />
              </marker>
            </defs>

            {/* Nodes */}
            <circle cx="80" cy="200" r="30" fill="#3B82F6" />
            <text x="80" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Input</text>
            <text x="80" y="260" textAnchor="middle" fill="#374151" fontSize="12">Layer 1</text>

            <circle cx="250" cy="200" r="30" fill="#10B981" />
            <text x="250" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Hidden</text>
            <text x="250" y="260" textAnchor="middle" fill="#374151" fontSize="12">Layer 2</text>

            <circle cx="420" cy="200" r="30" fill="#8B5CF6" />
            <text x="420" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Output</text>
            <text x="420" y="260" textAnchor="middle" fill="#374151" fontSize="12">Layer 3</text>

            {/* Gradient labels */}
            <text x="320" y="230" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
              ∂L/∂w₂
            </text>
            <text x="150" y="230" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">
              ∂L/∂w₁
            </text>
          </svg>

          <div className="mt-6 space-y-4">
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Step 1: Calculate Error</h3>
              <p className="text-sm text-red-700">Compare predicted output with target to compute loss</p>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Step 2: Compute Gradients</h3>
              <p className="text-sm text-orange-700">Calculate how each weight contributed to the error using chain rule</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Step 3: Update Weights</h3>
              <p className="text-sm text-green-700">Adjust weights in opposite direction of gradient: w = w - α × ∂L/∂w</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Handwriting Recognition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">
              Backpropagation is essential for training networks to recognize handwritten digits, like those used in check processing and postal automation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="bg-gray-900 rounded-lg p-4 text-white text-4xl font-bold w-20 h-20 flex items-center justify-center">7</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Model Prediction:</p>
                  <p className="text-2xl font-bold text-blue-600">7 (98.5%)</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  The network learns by comparing its predictions with correct labels and adjusting weights through backpropagation.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Training Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Accuracy</span>
                  <span className="font-semibold">96.8%</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: "96.8%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Training Loss</span>
                  <span className="font-semibold">0.087</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: "20%" }} />
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-4">
                After 1000 epochs of training with backpropagation, the model achieves high accuracy on digit recognition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
