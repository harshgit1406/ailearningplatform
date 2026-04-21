import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function HopfieldNetwork() {
  const [pattern, setPattern] = useState<boolean[]>(
    Array.from({ length: 25 }, () => Math.random() > 0.5)
  );
  const [noisyPattern, setNoisyPattern] = useState<boolean[]>([...pattern]);
  const [isRecalling, setIsRecalling] = useState(false);

  const addNoise = () => {
    const noisy = pattern.map((val) => (Math.random() < 0.3 ? !val : val));
    setNoisyPattern(noisy);
  };

  const recall = () => {
    setIsRecalling(true);
    let steps = 0;
    const interval = setInterval(() => {
      setNoisyPattern((prev) => {
        const updated = prev.map((val, idx) =>
          Math.random() < 0.3 ? pattern[idx] : val
        );
        steps++;
        if (steps >= 5 || JSON.stringify(updated) === JSON.stringify(pattern)) {
          clearInterval(interval);
          setIsRecalling(false);
          return pattern;
        }
        return updated;
      });
    }, 300);
  };

  const toggleCell = (index: number) => {
    setPattern((prev) => {
      const newPattern = [...prev];
      newPattern[index] = !newPattern[index];
      return newPattern;
    });
    setNoisyPattern((prev) => {
      const newPattern = [...prev];
      newPattern[index] = !newPattern[index];
      return newPattern;
    });
  };

  const randomizePattern = () => {
    const newPattern = Array.from({ length: 25 }, () => Math.random() > 0.5);
    setPattern(newPattern);
    setNoisyPattern(newPattern);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Hopfield Network</h1>
      <p className="text-lg text-gray-600 mb-8">
        Hopfield Networks are a type of recurrent neural network that serve as content-addressable memory systems. They can store patterns and retrieve them even from partial or noisy inputs.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Pattern Storage:</b> The network can memorize multiple patterns.</li>
          <li><b>Recall:</b> Given a noisy or incomplete input, the network converges to the closest stored pattern.</li>
        </ul>
        <br/>
        <b>Example:</b> Hopfield Networks are used in associative memory and solving optimization problems.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pattern Storage and Recall */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Pattern Storage & Recall</h2>

          <div className="space-y-6">
            {/* Original Pattern */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Stored Pattern (Click to Edit)</h3>
              <div className="inline-block bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-5 gap-2">
                  {pattern.map((cell, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleCell(idx)}
                      className={`w-12 h-12 rounded transition-all ${
                        cell ? "bg-blue-600" : "bg-gray-200"
                      } hover:opacity-80`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Noisy Pattern */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Current State (Noisy)</h3>
              <div className="inline-block bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-5 gap-2">
                  {noisyPattern.map((cell, idx) => (
                    <div
                      key={idx}
                      className={`w-12 h-12 rounded transition-all ${
                        cell ? "bg-green-600" : "bg-red-200"
                      } ${isRecalling ? "animate-pulse" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={addNoise}
                disabled={isRecalling}
                className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Noise
              </button>
              <button
                onClick={recall}
                disabled={isRecalling}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRecalling ? "animate-spin" : ""}`} />
                Recall
              </button>
            </div>

            <button
              onClick={randomizePattern}
              disabled={isRecalling}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              New Random Pattern
            </button>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How It Works</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Network stores patterns in connection weights</li>
              <li>2. Present a noisy or partial pattern</li>
              <li>3. Network iteratively updates until stable</li>
              <li>4. Converges to nearest stored pattern</li>
            </ol>
          </div>
        </div>

        {/* Network Architecture */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Network Architecture</h2>

          <svg width="100%" height="400" className="border border-gray-200 rounded-lg bg-gray-50">
            {/* Fully Connected Network Visualization */}
            {[0, 1, 2, 3, 4].map((i) =>
              [0, 1, 2, 3, 4].map((j) => {
                const x1 = 80 + i * 70;
                const y1 = 80 + j * 60;
                return [0, 1, 2, 3, 4].map((k) =>
                  [0, 1, 2, 3, 4].map((l) => {
                    if (i === k && j === l) return null;
                    const x2 = 80 + k * 70;
                    const y2 = 80 + l * 60;
                    return (
                      <line
                        key={`${i}-${j}-${k}-${l}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#3B82F6"
                        strokeWidth="0.5"
                        opacity="0.1"
                      />
                    );
                  })
                );
              })
            )}

            {/* Neurons */}
            {[0, 1, 2, 3, 4].map((i) =>
              [0, 1, 2, 3, 4].map((j) => {
                const x = 80 + i * 70;
                const y = 80 + j * 60;
                const idx = j * 5 + i;
                return (
                  <circle
                    key={`${i}-${j}`}
                    cx={x}
                    cy={y}
                    r="10"
                    fill={noisyPattern[idx] ? "#10B981" : "#EF4444"}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })
            )}

            <text x="250" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#374151">
              Fully Connected Recurrent Network
            </text>
          </svg>

          <div className="mt-6 space-y-3">
            <div className="bg-green-50 rounded-lg p-3">
              <h3 className="font-semibold text-green-900 text-sm mb-1">Symmetric Weights</h3>
              <p className="text-xs text-green-800">
                Connection weights are symmetric: w[i,j] = w[j,i], ensuring energy minimization
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <h3 className="font-semibold text-purple-900 text-sm mb-1">Asynchronous Updates</h3>
              <p className="text-xs text-purple-800">
                Neurons update one at a time based on weighted inputs from all other neurons
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <h3 className="font-semibold text-orange-900 text-sm mb-1">Energy Function</h3>
              <p className="text-xs text-orange-800">
                Network converges to local minimum of energy landscape, recalling stored patterns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Capacity and Limitations */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Network Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Storage Capacity</h3>
            <p className="text-sm text-blue-800">
              Can store approximately 0.15N patterns reliably, where N is the number of neurons
            </p>
            <p className="text-xs text-blue-700 mt-2">For 100 neurons: ~15 patterns</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Associative Memory</h3>
            <p className="text-sm text-green-800">
              Can recall complete patterns from partial or corrupted inputs (noise tolerance)
            </p>
            <p className="text-xs text-green-700 mt-2">Typically handles 20-30% noise</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2">Spurious States</h3>
            <p className="text-sm text-purple-800">
              May converge to unintended stable states (spurious patterns) not in training set
            </p>
            <p className="text-xs text-purple-700 mt-2">Trade-off with capacity</p>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Image Denoising</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-center">Original Image</h3>
            <div className="bg-white rounded-lg p-4">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded ${
                      [10, 11, 18, 19, 26, 27, 34, 35, 42, 43, 50, 51].includes(i)
                        ? "bg-blue-600"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">Clean pattern stored in network</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-center">Noisy Input</h3>
            <div className="bg-white rounded-lg p-4">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => {
                  const isOriginal = [10, 11, 18, 19, 26, 27, 34, 35, 42, 43, 50, 51].includes(i);
                  const isNoisy = Math.random() < 0.2;
                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded ${
                        (isOriginal && !isNoisy) || (!isOriginal && isNoisy)
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">Corrupted with 20% noise</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-center">Recalled Image</h3>
            <div className="bg-white rounded-lg p-4">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded ${
                      [10, 11, 18, 19, 26, 27, 34, 35, 42, 43, 50, 51].includes(i)
                        ? "bg-green-600"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">Network restored original pattern</p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            Hopfield networks can restore corrupted images by treating each pixel as a neuron. The network learns the clean image pattern and can reconstruct it even when presented with noisy versions.
          </p>
        </div>
      </div>
    </div>
  );
}
