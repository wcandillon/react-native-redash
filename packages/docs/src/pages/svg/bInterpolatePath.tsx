import React from "react"
import { Link } from "gatsby"

import { CodeHighlight, SEO } from "src/components"

const BInterpolatePathPage: React.FC = () => (
  <>
    <SEO title="bInterpolatePath - SVG" />

    <h1>bInterpolatePath(progress, path1, path2): path</h1>

    <p>
      Interpolate from one SVG point to the other, this function assumes that
      each path has the same number of points.
    </p>

    <CodeHighlight
      code={`
const rhino = "M 217.765 29.683 C 225.855 29.683 ";
const elephant = "M 223.174 43.413 ...";

return (
  <>
    <Animated.Code>
      {() =>
        set(
          progress,
          timing(clock, progress, {
            to: 1,
            duration: 2000,
            easing: Easing.linear
          })
        )
      }
    </Animated.Code>

    <Svg style={styles.container} viewBox="0 0 409 280">
      <AnimatedPath
        d={bInterpolatePath(progress, rhino, elephant)}
        fill="#7d8f9b"
      />
    </Svg>
  </>
);
      `}
    />

    <p>
      See also: <Link to="/svg/interpolatePath/">interpolatePath</Link>
    </p>
  </>
)

export default BInterpolatePathPage
