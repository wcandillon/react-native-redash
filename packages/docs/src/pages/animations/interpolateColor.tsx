import React from "react"

import { CodeHighlight, SEO } from "src/components"

const InterpolateColorPage: React.FC = () => (
  <>
    <SEO title="interpolateColor - Animations" />

    <h1>
      interpolateColor(node: Node, &#123; inputRange, outputRange &#125;:
      ColorInterpolationConfig, [colorSpace = "rgb"]): Node
    </h1>

    <p>Interpolate colors based on an animation value and its value range.</p>

    <CodeHighlight
      code={`
interpolateColor(value: Node, { inputRange: number[], outputRange: Colors }, colorSpace?: "hsv" | "rgb"): Node
      `}
    />

    <p>Example Usage:</p>

    <CodeHighlight
      code={`
const from = { r: 197, g: 43, b: 39 };
const to = { r: 225, g: 176, b: 68 };

// Interpolate in RGB color space (default)
interpolateColor(node, {
  inputRange: [0, 100],
  outputRange: [from, to]
});

// Interpolate in HSV color space
interpolateColor(
  clampedScroll,
  {
    inputRange: [0, 1],
    outputRange: [from, to]
  },
  "hsv"
);
      `}
    />

    <p>HEX colors will be automatically converted to RGB</p>

    <CodeHighlight
      code={`
interpolateColor(node, {
  inputRange: [0, 100],
  outputRange: ["#c52c27", "#e1b044"]
});

// with alpha
interpolateColor(node, {
  inputRange: [0, 100],
  outputRange: ["#c52c2700", "#c52c27ff"]
});
      `}
    />
  </>
)

export default InterpolateColorPage
