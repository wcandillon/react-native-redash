import React from "react"

import { SEO } from "src/components"

const GetLengthAtXPage: React.FC = () => (
  <>
    <SEO title="getLengthAtX - SVG" />

    <h1>getLengthAtX(path: ReanimatedPath, x: Node): Node</h1>

    <p>
      Convenience function for bezier curves where there is really only ever one
      "y" value associated with one "x" value. This function works by finding
      the roots of the cubic bezier curve so it might be too compute-intensive
      to calculate for each frame.
    </p>
  </>
)

export default GetLengthAtXPage
