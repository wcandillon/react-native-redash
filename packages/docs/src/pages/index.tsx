import React from "react"

import { SEO } from "src/components"

const IndexPage: React.FC = () => (
  <>
    <SEO title="Home" />

    <h1>Redash</h1>

    <p>
      <a
        href="https://circleci.com/gh/wcandillon/react-native-redash"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <img
          src="https://camo.githubusercontent.com/6a439284619f2247b277f27d7ed655de1d3a1cd8/68747470733a2f2f636972636c6563692e636f6d2f67682f7763616e64696c6c6f6e2f72656163742d6e61746976652d7265646173682e7376673f7374796c653d737667"
          alt="CircleCI"
          data-canonical-src="https://circleci.com/gh/wcandillon/react-native-redash.svg?style=svg"
        />
      </a>{" "}
      <a
        href="https://badge.fury.io/js/react-native-redash"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <img
          src="https://camo.githubusercontent.com/597f601f51e2aa8c8daf8405c3278af68508860f/68747470733a2f2f62616467652e667572792e696f2f6a732f72656163742d6e61746976652d7265646173682e737667"
          alt="npm version"
          data-canonical-src="https://badge.fury.io/js/react-native-redash.svg"
        />
      </a>
    </p>

    <p>
      Utility library for React Native Gesture Handler and Reanimated. As seen
      on the{" "}
      <a
        href="http://youtube.com/user/wcandill"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        “Can it be done in React Native?”
      </a>{" "}
      YouTube series.
    </p>
  </>
)

export default IndexPage
