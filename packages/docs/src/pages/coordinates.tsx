import React from "react"

import { CodeHighlight, SEO } from "src/components"

const CoordinatesPage: React.FC = () => (
  <>
    <SEO title="Coordinates" />

    <h1>Coordinates</h1>

    <p>
      In order to easily build certain types of animations, it can be extremely
      useful to switch from one coordinate system to another.
    </p>

    <p>
      For instance, to convert a <code>x</code> and <code>x</code> coordinate
      from the React Native canvas to a polar coordinate system centered at{" "}
      <code>100, 100</code>:
    </p>

    <CodeHighlight
      code={`
const x = 0;
const y = 100;
const center = { x: 100, y: 100 };
const {theta, radius} = cartesian2Polart(
  canvas2Cartesian({ x, y }, center)
);
// theta is π, radius: 100
      `}
    />

    <CodeHighlight
      code={`
canvas2Cartesian({ x, y }, center)
      `}
    />

    <CodeHighlight
      code={`
canvasToPolar({ theta, radius }, center)
      `}
    />

    <CodeHighlight
      code={`
cartesian2Canvas({ x, y }, center)
      `}
    />

    <CodeHighlight
      code={`
cartesianToPolar({ x, y })
      `}
    />

    <CodeHighlight
      code={`
polarToCartesian({ theta, radius })
      `}
    />

    <CodeHighlight
      code={`
polarToCanvas({ theta, radius })
      `}
    />
  </>
)

export default CoordinatesPage
