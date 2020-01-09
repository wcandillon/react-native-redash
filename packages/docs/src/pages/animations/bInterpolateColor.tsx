import React from "react"
import { Link } from "gatsby"

import { CodeHighlight, SEO } from "src/components"

const BInterpolateColorPage: React.FC = () => (
  <>
    <SEO title="bInterpolateColor - Animations" />

    <h1>bInterpolateColor(node, color1, color2, [colorSpace = "rgb"])</h1>

    <p>Interpolate the node from 0 to 1 without clamping.</p>

    <CodeHighlight
      code={`
const from = { r: 197, g: 43, b: 39 };
const to = { r: 225, g: 176, b: 68 };

bInterpolateColor(node, from, to);
      `}
    />

    <p>
      See also: <Link to="/animations/interpolateColor/">interpolateColor</Link>
    </p>
  </>
)

export default BInterpolateColorPage
