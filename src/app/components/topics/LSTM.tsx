import { useState } from "react";
import { TrendingUp } from "lucide-react";

export function LSTM() {
  const [forgetGate, setForgetGate] = useState(0.5);
  const [inputGate, setInputGate] = useState(0.7);
  const [outputGate, setOutputGate] = useState(0.6);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Long Short-Term Memory (LSTM)</h1>
      <p className="text-lg text-gray-600 mb-8">
        LSTM networks are a special kind of Recurrent Neural Network (RNN) capable of learning long-term dependencies. They are designed to avoid the long-term dependency problem, remembering information for long periods.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Forget Gate:</b> Decides what information to discard from the cell state.</li>
          <li><b>Input Gate:</b> Decides which values from the input to update the cell state.</li>
          <li><b>Output Gate:</b> Decides what part of the cell state to output.</li>
        </ul>
        <br/>
        <b>Example:</b> LSTMs are used in language modeling, translation, and time series prediction, where remembering context over many steps is crucial.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gate Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">LSTM Gates</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forget Gate: {forgetGate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={forgetGate}
                onChange={(e) => setForgetGate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Controls what to remove from cell state</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Gate: {inputGate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={inputGate}
                onChange={(e) => setInputGate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Controls what new information to store</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output Gate: {outputGate.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={outputGate}
                onChange={(e) => setOutputGate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Controls what to output from cell state</p>
            </div>
          </div>

          {/* Gate State Visualization */}
          <div className="mt-6 space-y-3">
            <div className="bg-red-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-900">Forget Gate</span>
                <span className="text-sm text-red-700">{(forgetGate * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-red-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all"
                  style={{ width: `${forgetGate * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Input Gate</span>
                <span className="text-sm text-blue-700">{(inputGate * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-blue-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${inputGate * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900">Output Gate</span>
                <span className="text-sm text-green-700">{(outputGate * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-green-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 transition-all"
                  style={{ width: `${outputGate * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LSTM Architecture */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">LSTM Cell Architecture</h2>

          <svg width="100%" height="450" className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Cell State Line (horizontal) */}
            <line x1="50" y1="80" x2="450" y2="80" stroke="#8B5CF6" strokeWidth="4" />
            <text x="50" y="60" fontSize="12" fontWeight="bold" fill="#8B5CF6">Cell State</text>

            {/* Forget Gate */}
            <g>
              <rect x="100" y="150" width="60" height="60" rx="5" fill="#EF4444" opacity="0.8" />
              <text x="130" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                σ
              </text>
              <line x1="130" y1="210" x2="130" y2="80" stroke="#EF4444" strokeWidth="2" />
              <circle cx="130" cy="80" r="8" fill="#EF4444" stroke="white" strokeWidth="2" />
              <text x="130" y="240" textAnchor="middle" fontSize="10" fill="#374151">Forget</text>
            </g>

            {/* Input Gate */}
            <g>
              <rect x="220" y="150" width="60" height="60" rx="5" fill="#3B82F6" opacity="0.8" />
              <text x="250" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                σ
              </text>
              <line x1="250" y1="210" x2="250" y2="80" stroke="#3B82F6" strokeWidth="2" />
              <circle cx="250" cy="80" r="8" fill="#3B82F6" stroke="white" strokeWidth="2" />
              <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#374151">Input</text>
            </g>

            {/* Candidate Values */}
            <g>
              <rect x="310" y="150" width="60" height="60" rx="5" fill="#F59E0B" opacity="0.8" />
              <text x="340" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                tanh
              </text>
              <line x1="340" y1="210" x2="340" y2="100" stroke="#F59E0B" strokeWidth="2" />
              <line x1="340" y1="100" x2="270" y2="80" stroke="#F59E0B" strokeWidth="2" />
              <text x="340" y="240" textAnchor="middle" fontSize="10" fill="#374151">Candidate</text>
            </g>

            {/* Output Gate */}
            <g>
              <rect x="180" y="280" width="60" height="60" rx="5" fill="#10B981" opacity="0.8" />
              <text x="210" y="315" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                σ
              </text>
              <line x1="210" y1="280" x2="210" y2="80" stroke="#10B981" strokeWidth="2" />
              <text x="210" y="370" textAnchor="middle" fontSize="10" fill="#374151">Output</text>
            </g>

            {/* tanh for output */}
            <g>
              <rect x="300" y="280" width="60" height="60" rx="5" fill="#8B5CF6" opacity="0.8" />
              <text x="330" y="315" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                tanh
              </text>
              <line x1="330" y1="280" x2="330" y2="80" stroke="#8B5CF6" strokeWidth="2" />
            </g>

            {/* Hidden state output */}
            <line x1="270" y1="310" x2="270" y2="400" stroke="#10B981" strokeWidth="3" />
            <circle cx="270" cy="410" r="12" fill="#10B981" />
            <text x="270" y="435" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#374151">
              h[t]
            </text>

            {/* Input arrows */}
            <line x1="50" y1="400" x2="130" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)" />
            <line x1="50" y1="400" x2="250" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)" />
            <line x1="50" y1="400" x2="340" y2="150" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)" />
            <line x1="50" y1="400" x2="210" y2="340" stroke="#666" strokeWidth="2" markerEnd="url(#arrow3)" />

            <text x="30" y="410" fontSize="11" fontWeight="bold" fill="#374151">x[t]</text>

            <defs>
              <marker id="arrow3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#666" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>

      {/* Key Advantages */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Why LSTM?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Solves Vanishing Gradient</h3>
            <p className="text-sm text-blue-800">
              Gates allow gradients to flow unchanged through many time steps, enabling learning of long-term dependencies.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Selective Memory</h3>
            <p className="text-sm text-green-800">
              Forget gate decides what to remove, input gate decides what to add, allowing selective information retention.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Flexible Output</h3>
            <p className="text-sm text-purple-800">
              Output gate controls what information from the cell state to expose at each time step.
            </p>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Stock Price Prediction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">
              LSTM networks excel at time series forecasting, making them ideal for predicting stock prices based on historical patterns.
            </p>

            {/* Stock Chart */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm">AAPL</p>
                  <p className="text-white text-2xl font-bold">$175.50</p>
                  <p className="text-green-500 text-sm">+2.5% ▲</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>

              <svg width="100%" height="150">
                <polyline
                  points="0,120 40,110 80,100 120,95 160,85 200,80 240,75 280,70 320,65"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                />
                <polyline
                  points="280,70 320,65 360,60"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                />
                <text x="340" y="50" fontSize="10" fill="#3B82F6">Predicted</text>
              </svg>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Model Features</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 text-sm mb-1">Historical Data</h4>
                <p className="text-xs text-blue-800">Processes 60 days of price, volume, and technical indicators</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 text-sm mb-1">Pattern Recognition</h4>
                <p className="text-xs text-green-800">LSTM identifies trends, seasonality, and market patterns</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <h4 className="font-semibold text-purple-900 text-sm mb-1">Prediction Output</h4>
                <p className="text-xs text-purple-800">Forecasts next day price with confidence intervals</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-100 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-700">Model Accuracy:</span>
                <span className="font-semibold text-green-600">87.3%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: "87.3%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
