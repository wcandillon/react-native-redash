# redash

[![CircleCI](https://circleci.com/gh/wcandillon/react-native-redash.svg?style=svg)](https://circleci.com/gh/wcandillon/react-native-redash)
[![npm version](https://badge.fury.io/js/react-native-redash.svg)](https://badge.fury.io/js/react-native-redash)

The React Native Reanimated and Gesture Handler Toolbelt. As seen on the [“Can it be done in React Native?”](http://youtube.com/user/wcandill) YouTube series.

## Installation

```sh
yarn add react-native-redash
```

## Documentation

[https://wcandillon.gitbook.io/redash/](https://wcandillon.gitbook.io/redash/)

## ⚠️ v1 Users ⚠️

v1 documentation: https://wcandillon.github.io/react-native-redash-v1-docs/

To access functions that work with Reanimated v1 nodes, use the following import:

```ts
import {usePanGestureHandler} from  "react-native-redash/lib/module/v1";
```

To add TypeScript support for the v1 functions, add the following type to your `tsconfig`:

```json
  "include": ["node_modules/react-native-redash/lib/typescript/v1/index.d.ts"]
```
