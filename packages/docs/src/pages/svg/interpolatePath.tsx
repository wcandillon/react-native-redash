import React from "react"

import { CodeHighlight, SEO } from "src/components"

const InterpolatePathPage: React.FC = () => (
  <>
    <SEO title="interpolatePath - SVG" />

    <h1>
      interpolatePath(value: Node, &#123; inputRange, outputRange &#125;): path
    </h1>

    <p>
      Interpolate from one SVG point to the other, this function assumes that
      each path has the same number of points.
    </p>

    <CodeHighlight
      code={`
const phone1 = "M 18 149C 18 149 25 149 25 149 25 14...";

const d = interpolatePath(slider, {
  inputRange: [0, width, width * 2],
  outputRange: [phone1, phone2, phone3]
});

return (
  <Svg style={styles.svg} viewBox="0 0 100 300">
    <AnimatedPath fill="black" {...{ d }} />
  </Svg>
);
      `}
    />
  </>
)

export default InterpolatePathPage
