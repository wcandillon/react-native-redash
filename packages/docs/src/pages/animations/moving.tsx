import React from "react"

import { SEO } from "src/components"

const MovingPage: React.FC = () => (
  <>
    <SEO title="moving - Animations" />

    <h1>moving(point, minPositionDelta = 1e-3, emptyFrameThreshold = 5)</h1>

    <p>
      Returns true when the animation node stopped updating within
      <code>emptyFrameThreshold</code> frames. This function can be useful to
      detect if an animation is over.
    </p>
  </>
)

export default MovingPage
