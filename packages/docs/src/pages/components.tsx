import React from "react"

import { CodeHighlight, SEO } from "src/components"

const ComponentsPage: React.FC = () => (
  <>
    <SEO title="Components" />

    <h1>Components</h1>

    <h2>ReText</h2>

    <p>Component that displays an animation value as text.</p>

    <CodeHighlight
      code={`
<ReText text={new Value("hello world!")} style={{ color: "blue" }} />
      `}
    />
  </>
)

export default ComponentsPage
