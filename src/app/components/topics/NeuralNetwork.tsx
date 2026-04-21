import { useState } from "react";
import { Slider } from "@radix-ui/react-slider";

export function NeuralNetwork() {
  const [layers, setLayers] = useState(3);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState(4);
  const [activationStrength, setActivationStrength] = useState(50);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Neural Network Basics</h1>
      <p className="text-lg text-gray-600 mb-8">
        Artificial Neural Networks (ANNs) are inspired by the human brain and consist of interconnected nodes (neurons) organized in layers. Each neuron processes input and passes the result to the next layer.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Layers:</b> Input, hidden, and output layers process data in stages.</li>
          <li><b>Activation Function:</b> Determines the output of a neuron, introducing non-linearity.</li>
          <li><b>Weights & Biases:</b> Parameters that are learned during training to minimize error.</li>
        </ul>
        <br/>
        <b>Example:</b> ANNs are used in tasks like image recognition, speech recognition, and game playing.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Interactive Network</h2>

          {/* Controls */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Layers: {layers}
              </label>
              <Slider
                value={[layers]}
                onValueChange={(value) => setLayers(value[0])}
                min={2}
                max={5}
                step={1}
                className="relative flex items-center w-full h-5"
              >
                <div className="relative h-1 w-full bg-gray-200 rounded">
                  <div
                    className="absolute h-full bg-blue-600 rounded"
                    style={{ width: `${((layers - 2) / 3) * 100}%` }}
                  />
                </div>
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 cursor-pointer" style={{ left: `${((layers - 2) / 3) * 100}%` }} />
              </Slider>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Neurons per Layer: {neuronsPerLayer}
              </label>
              <Slider
                value={[neuronsPerLayer]}
                onValueChange={(value) => setNeuronsPerLayer(value[0])}
                min={2}
                max={8}
                step={1}
                className="relative flex items-center w-full h-5"
              >
                <div className="relative h-1 w-full bg-gray-200 rounded">
                  <div
                    className="absolute h-full bg-green-600 rounded"
                    style={{ width: `${((neuronsPerLayer - 2) / 6) * 100}%` }}
                  />
                </div>
                <div className="absolute w-4 h-4 bg-green-600 rounded-full -translate-x-1/2 cursor-pointer" style={{ left: `${((neuronsPerLayer - 2) / 6) * 100}%` }} />
              </Slider>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activation Strength: {activationStrength}%
              </label>
              <Slider
                value={[activationStrength]}
                onValueChange={(value) => setActivationStrength(value[0])}
                min={0}
                max={100}
                step={5}
                className="relative flex items-center w-full h-5"
              >
                <div className="relative h-1 w-full bg-gray-200 rounded">
                  <div
                    className="absolute h-full bg-purple-600 rounded"
                    style={{ width: `${activationStrength}%` }}
                  />
                </div>
                <div className="absolute w-4 h-4 bg-purple-600 rounded-full -translate-x-1/2 cursor-pointer" style={{ left: `${activationStrength}%` }} />
              </Slider>
            </div>
          </div>

          {/* Network Visualization */}
          <svg width="100%" height="300" className="border border-gray-200 rounded-lg bg-gray-50">
            {Array.from({ length: layers }).map((_, layerIndex) => {
              const x = (layerIndex / (layers - 1)) * 400 + 50;
              return Array.from({ length: neuronsPerLayer }).map((_, neuronIndex) => {
                const y = (neuronIndex / (neuronsPerLayer - 1)) * 200 + 50;
                const opacity = activationStrength / 100;

                return (
                  <g key={`${layerIndex}-${neuronIndex}`}>
                    {layerIndex < layers - 1 &&
                      Array.from({ length: neuronsPerLayer }).map((_, nextNeuronIndex) => {
                        const nextX = ((layerIndex + 1) / (layers - 1)) * 400 + 50;
                        const nextY = (nextNeuronIndex / (neuronsPerLayer - 1)) * 200 + 50;
                        return (
                          <line
                            key={nextNeuronIndex}
                            x1={x}
                            y1={y}
                            x2={nextX}
                            y2={nextY}
                            stroke="#3B82F6"
                            strokeWidth="1"
                            opacity={opacity * 0.3}
                          />
                        );
                      })}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="#3B82F6"
                      opacity={opacity}
                      className="transition-all"
                    />
                  </g>
                );
              });
            })}
          </svg>
        </div>

        {/* Real-World Application */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Real-World Application</h2>
          <h3 className="font-semibold text-blue-600 mb-4">Image Classification Demo</h3>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {["🐱", "🐶", "🐦"].map((emoji, idx) => (
                <button
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-4xl"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-center text-gray-600 text-sm">Click an image to classify</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Cat</span>
              <span className="text-sm text-gray-600">85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Dog</span>
              <span className="text-sm text-gray-600">12%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: "12%" }} />
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Bird</span>
              <span className="text-sm text-gray-600">3%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: "3%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Concept Explanation */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Key Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-blue-600 mb-2">Neurons</h3>
            <p className="text-gray-600 text-sm">
              Basic computational units that receive inputs, apply weights, and produce outputs through activation functions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-600 mb-2">Layers</h3>
            <p className="text-gray-600 text-sm">
              Networks are organized in layers: input layer receives data, hidden layers process it, and output layer produces results.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-purple-600 mb-2">Connections</h3>
            <p className="text-gray-600 text-sm">
              Weighted connections between neurons determine how information flows and gets transformed through the network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
