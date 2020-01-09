import React from "react"

import { SEO } from "src/components"

const CubicBezierPage: React.FC = () => (
  <>
    <SEO title="cubicBezier - Math" />

    <h1>cubicBezier(t: Node, p0: Node, p1: Node, p2: Node, p3: Node): Node</h1>

    <p>
      Returns the coordinate of a cubic bezier curve. <code>t</code> is the
      length of the curve from 0 to 1.{" "}
      <code>cubicBezier(0, p0, p1, p2, p3)</code> equals <code>p0</code> and
      <code>cubicBezier(1, p0, p1, p2, p3)</code> equals <code>p3</code>.{" "}
      <code>p0</code> and <code>p3</code> are respectively the starting and
      ending point of the curve. <code>p1</code> and <code>p2</code> are the
      control points.
    </p>
  </>
)

export default CubicBezierPage
