import { useState } from "react";
import { Mic, Play } from "lucide-react";

export function RNN() {
  const [sequenceLength, setSequenceLength] = useState(5);
  const [hiddenSize, setHiddenSize] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("Hello World");

  const runSequence = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Recurrent Neural Networks (RNN)</h1>
      <p className="text-lg text-gray-600 mb-8">
        RNNs are a type of neural network designed for sequential data. They have loops that allow information to persist, making them ideal for tasks where context from previous steps is important.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Hidden State:</b> Maintains memory of previous inputs in the sequence.</li>
          <li><b>Sequence Processing:</b> Processes data one step at a time, passing information along the sequence.</li>
        </ul>
        <br/>
        <b>Example:</b> RNNs are used in speech recognition, language modeling, and music generation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">RNN Parameters</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sequence Length: {sequenceLength}
              </label>
              <input
                type="range"
                min="3"
                max="8"
                step="1"
                value={sequenceLength}
                onChange={(e) => setSequenceLength(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hidden State Size: {hiddenSize}
              </label>
              <input
                type="range"
                min="2"
                max="5"
                step="1"
                value={hiddenSize}
                onChange={(e) => setHiddenSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={runSequence}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Process Sequence
            </button>
          </div>

          {/* Hidden State Visualization */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Hidden State Values</h3>
            <div className="space-y-2">
              {Array.from({ length: hiddenSize }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-12">h[{i}]</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-blue-400 to-purple-600 transition-all ${
                        isProcessing ? "animate-pulse" : ""
                      }`}
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Key Feature</h3>
            <p className="text-sm text-blue-800">
              RNNs maintain a hidden state that acts as memory, allowing them to remember information from earlier in the sequence.
            </p>
          </div>
        </div>

        {/* Sequential Processing Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Sequential Processing</h2>

          <svg width="100%" height="400" className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Unrolled RNN */}
            {Array.from({ length: Math.min(sequenceLength, 5) }).map((_, t) => {
              const x = 60 + t * 90;
              return (
                <g key={t}>
                  {/* Input */}
                  <circle cx={x} cy="320" r="15" fill="#3B82F6" className={isProcessing ? "animate-pulse" : ""} />
                  <text x={x} y="355" textAnchor="middle" fontSize="10" fill="#374151">
                    x[{t}]
                  </text>

                  {/* Arrow to RNN cell */}
                  <line x1={x} y1="305" x2={x} y2="240" stroke="#3B82F6" strokeWidth="2" />

                  {/* RNN Cell */}
                  <rect
                    x={x - 25}
                    y="190"
                    width="50"
                    height="50"
                    rx="5"
                    fill="#10B981"
                    className={isProcessing ? "animate-pulse" : ""}
                  />
                  <text x={x} y="220" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                    RNN
                  </text>

                  {/* Hidden state connection */}
                  {t < Math.min(sequenceLength, 5) - 1 && (
                    <line
                      x1={x + 25}
                      y1="215"
                      x2={x + 65}
                      y2="215"
                      stroke="#8B5CF6"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead2)"
                    />
                  )}

                  {/* Output */}
                  <line x1={x} y1="190" x2={x} y2="100" stroke="#EF4444" strokeWidth="2" />
                  <circle cx={x} cy="85" r="15" fill="#EF4444" className={isProcessing ? "animate-pulse" : ""} />
                  <text x={x} y="65" textAnchor="middle" fontSize="10" fill="#374151">
                    y[{t}]
                  </text>
                </g>
              );
            })}

            <defs>
              <marker
                id="arrowhead2"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#8B5CF6" />
              </marker>
            </defs>

            {/* Labels */}
            <text x="250" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
              Unrolled RNN Through Time
            </text>
          </svg>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded" />
              <span className="text-sm text-gray-700">Input sequence</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 rounded" />
              <span className="text-sm text-gray-700">Hidden state (memory)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded" />
              <span className="text-sm text-gray-700">Output sequence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Speech-to-Text</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-6">
              RNNs excel at processing audio sequences for speech recognition, converting spoken words into text in real-time.
            </p>

            {/* Microphone Simulation */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8">
              <div className="flex flex-col items-center">
                <button className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg mb-4">
                  <Mic className="w-12 h-12 text-white" />
                </button>
                <p className="text-sm text-gray-700 font-medium">Click to speak</p>

                {/* Audio Waveform Visualization */}
                <div className="mt-6 w-full h-20 bg-white rounded-lg p-2 flex items-center justify-center gap-1">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-600 rounded-full transition-all"
                      style={{
                        height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 20}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Transcription Output</h3>
            <div className="bg-gray-50 rounded-lg p-6 mb-4 min-h-[120px]">
              <p className="text-lg text-gray-900">{recognizedText}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">Listening...</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-900 text-sm mb-1">Acoustic Model</h4>
                <p className="text-xs text-blue-800">RNN processes audio features frame by frame</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 text-sm mb-1">Language Model</h4>
                <p className="text-xs text-green-800">Predicts most likely word sequences</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <h4 className="font-semibold text-purple-900 text-sm mb-1">Decoder</h4>
                <p className="text-xs text-purple-800">Converts predictions to final text output</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
