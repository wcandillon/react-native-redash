import React from "react"

import { CodeHighlight, SEO } from "src/components"

const StringPage: React.FC = () => (
  <>
    <SEO title="String" />

    <h1>String</h1>

    <h2>string</h2>

    <p>Tagged template for animated string values.</p>

    <CodeHighlight
      code={`
const { x, y } = { x: new Value(0), y: new Value(0) };
const d = string\`M0,0 \${x},\${y}\`;
return <AnimatedPath {...{ d }} />;
      `}
    />
  </>
)

export default StringPage
