import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ParsePathPage: React.FC = () => (
  <>
    <SEO title="parsePath - SVG" />

    <h1>parsePath(SVGPath: String): ReanimatedPath</h1>

    <p>
      Given an SVG Path, returns a denormalized object of values that can be
      used for animations on that path. From the perspective of the user, the
      returned value should be considered a black box. Here is an example below:
    </p>

    <CodeHighlight
      code={`
// We get the data from the SVG Path denormalized a way that can be handled with Reanimated
const path = parsePath(d);
const { y, x } = getPointAtLength(path, length);
      `}
    />
  </>
)

export default ParsePathPage
