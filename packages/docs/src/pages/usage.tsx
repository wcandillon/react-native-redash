import React from "react"

import { CodeHighlight, SEO } from "src/components"

const UsagePage: React.FC = () => (
  <>
    <SEO title="Usage" />

    <h1>Usage</h1>

    <CodeHighlight
      code={`
yarn add react-native-redash
      `}
    />

    <CodeHighlight
      code={`
import { atan2 } from "react-native-redash";

atan2(y, x);
      `}
    />
  </>
)

export default UsagePage
