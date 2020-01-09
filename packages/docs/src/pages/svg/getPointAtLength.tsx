import React from "react"

import { CodeHighlight, SEO } from "src/components"

const GetPointAtLengthPage: React.FC = () => (
  <>
    <SEO title="getPointAtLength - SVG" />

    <h1>getPointAtLength(path): &#123; x: Node, y: Node &#125;</h1>

    <p>
      Implementation of{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getPointAtLength"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        getPointAtLength
      </a>{" "}
      for Reanimated.
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

export default GetPointAtLengthPage
