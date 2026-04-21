import { useState } from "react";
import { Grid3x3 } from "lucide-react";

export function CNN() {
  const [kernelSize, setKernelSize] = useState(3);
  const [stride, setStride] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState<"edge" | "blur" | "sharpen">("edge");

  const filters = {
    edge: [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]],
    blur: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    sharpen: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Convolutional Neural Networks (CNN)</h1>
      <p className="text-lg text-gray-600 mb-8">
        Convolutional Neural Networks (CNNs) are a class of deep neural networks most commonly applied to analyzing visual imagery. They use convolution operations to detect features in images, such as edges, textures, and objects. CNNs are widely used in image classification, object detection, and computer vision tasks.<br/>
        <br/>
        <b>Key Concepts:</b><br/>
        <ul className="list-disc ml-6">
          <li><b>Convolution:</b> A mathematical operation that slides a filter (kernel) over the input image to produce a feature map.</li>
          <li><b>Pooling:</b> Reduces the spatial size of the feature maps, making the computation more efficient and helping to extract dominant features.</li>
          <li><b>Filters:</b> Learnable weights that help the network detect specific features.</li>
        </ul>
        <br/>
        <b>Example:</b> In facial recognition, early layers of a CNN might detect edges and simple shapes, while deeper layers detect eyes, noses, and faces.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Convolution Parameters</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kernel Size: {kernelSize}×{kernelSize}
              </label>
              <input
                type="range"
                min="3"
                max="5"
                step="2"
                value={kernelSize}
                onChange={(e) => setKernelSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stride: {stride}
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={stride}
                onChange={(e) => setStride(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Filter Type</label>
              <div className="grid grid-cols-3 gap-3">
                {(["edge", "blur", "sharpen"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      selectedFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kernel Visualization */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Kernel (Filter)</h3>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <div className="grid grid-cols-3 gap-2">
                {filters[selectedFilter].map((row, i) =>
                  row.map((val, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`w-12 h-12 flex items-center justify-center font-mono text-sm font-bold rounded ${
                        val > 0
                          ? "bg-green-100 text-green-700"
                          : val < 0
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {val}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Convolution Visualization */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Convolution Operation</h2>

          <div className="space-y-6">
            {/* Input Image */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Input Image (5×5)</h3>
              <div className="inline-block bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-5 gap-1">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded"
                      style={{
                        opacity: 0.3 + (Math.random() * 0.7),
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Convolution Arrow */}
            <div className="flex items-center justify-center">
              <div className="text-3xl text-blue-600">↓</div>
            </div>

            {/* Feature Map */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Feature Map (3×3)</h3>
              <div className="inline-block bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-600 rounded"
                      style={{
                        opacity: 0.4 + (Math.random() * 0.6),
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Slide kernel across input image</li>
              <li>2. Multiply kernel values with image pixels</li>
              <li>3. Sum the products to get feature value</li>
              <li>4. Move by stride and repeat</li>
            </ol>
          </div>
        </div>
      </div>

      {/* CNN Architecture */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">CNN Architecture Layers</h2>
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <div className="flex-shrink-0 bg-blue-100 rounded-lg p-4 text-center min-w-[140px]">
            <Grid3x3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-blue-900">Input</p>
            <p className="text-xs text-blue-700">32×32×3</p>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="flex-shrink-0 bg-green-100 rounded-lg p-4 text-center min-w-[140px]">
            <Grid3x3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-green-900">Conv Layer</p>
            <p className="text-xs text-green-700">28×28×32</p>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="flex-shrink-0 bg-purple-100 rounded-lg p-4 text-center min-w-[140px]">
            <Grid3x3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-purple-900">Pooling</p>
            <p className="text-xs text-purple-700">14×14×32</p>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="flex-shrink-0 bg-orange-100 rounded-lg p-4 text-center min-w-[140px]">
            <Grid3x3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="font-semibold text-orange-900">Flatten</p>
            <p className="text-xs text-orange-700">6272</p>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="flex-shrink-0 bg-red-100 rounded-lg p-4 text-center min-w-[140px]">
            <Grid3x3 className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="font-semibold text-red-900">Output</p>
            <p className="text-xs text-red-700">10 classes</p>
          </div>
        </div>
      </div>

      {/* Real-World Application */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Real-World Application: Object Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-4">
              CNNs power modern object detection systems in autonomous vehicles, security cameras, and medical imaging.
            </p>
            <div className="bg-gray-900 rounded-lg p-6 relative h-64">
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                🚗
              </div>
              <div className="absolute top-12 left-12 right-12 bottom-12 border-2 border-green-500 rounded-lg">
                <div className="absolute -top-6 left-0 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Car: 95%
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Detection Results</h3>
            <div className="space-y-3">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-green-900">Car</span>
                  <span className="text-sm text-green-700">95%</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: "95%" }} />
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-blue-900">Road</span>
                  <span className="text-sm text-blue-700">89%</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: "89%" }} />
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-purple-900">Traffic Sign</span>
                  <span className="text-sm text-purple-700">78%</span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: "78%" }} />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">
              CNN processes the image through multiple convolutional layers to identify and locate objects with bounding boxes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
