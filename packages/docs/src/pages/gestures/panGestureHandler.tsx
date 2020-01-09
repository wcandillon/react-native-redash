import React from "react"

import { CodeHighlight, SEO } from "src/components"

const PanGestureHandlerPage: React.FC = () => (
  <>
    <SEO title="panGestureHandler - Gestures" />

    <h1>panGestureHandler()</h1>

    <CodeHighlight
      code={`
const {
  gestureHandler,
  state
  translationX,
  velocityX,
  translationY,
  velocityY
} = panGestureHandler();

return (
  <PanGestureHandler {...gestureHandler} />
);
      `}
    />
  </>
)

export default PanGestureHandlerPage
