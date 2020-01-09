export interface ISingleLinkItem {
  type: "single"
  label: string
  to: string
}

export interface IMultipleLinkItem {
  type: "multi"
  label: string
  subitems: {
    label: string
    to: string
  }[]
}

type SidebarItem = ISingleLinkItem | IMultipleLinkItem

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    type: "single",
    label: "Home",
    to: "/",
  },
  {
    type: "single",
    label: "Usage",
    to: "/usage/",
  },
  {
    type: "single",
    label: "Components",
    to: "/components/",
  },
  {
    type: "multi",
    label: "SVG",
    subitems: [
      { label: "parsePath", to: "/svg/parsePath/" },
      { label: "getPointAtLength", to: "/svg/getPointAtLength/" },
      { label: "interpolatePath", to: "/svg/interpolatePath/" },
      { label: "bInterpolatePath", to: "/svg/bInterpolatePath/" },
      { label: "getLengthAtX", to: "/svg/getLengthAtX/" },
    ],
  },
  {
    type: "multi",
    label: "Math",
    subitems: [
      { label: "inc", to: "/math/inc/" },
      { label: "dec", to: "/math/dec/" },
      { label: "toRad", to: "/math/toRad/" },
      { label: "toDeg", to: "/math/toDeg/" },
      { label: "min", to: "/math/min/" },
      { label: "max", to: "/math/max/" },
      { label: "clamp", to: "/math/clamp/" },
      { label: "between", to: "/math/between/" },
      { label: "approximates", to: "/math/approximates/" },
      { label: "atan2", to: "/math/atan2/" },
      { label: "cubicBezier", to: "/math/cubicBezier/" },
    ],
  },
  {
    type: "single",
    label: "Coordinates",
    to: "/coordinates/",
  },
  {
    type: "single",
    label: "String",
    to: "/string/",
  },
  {
    type: "multi",
    label: "Array",
    subitems: [
      { label: "get", to: "/array/get/" },
      { label: "find", to: "/array/find/" },
      { label: "contains", to: "/array/contains/" },
    ],
  },
  {
    type: "single",
    label: "Transitions",
    to: "/transitions/",
  },
  {
    type: "multi",
    label: "Animations",
    subitems: [
      { label: "useValues", to: "/animations/useValues/" },
      { label: "useDiff", to: "/animations/useDiff/" },
      { label: "timing", to: "/animations/timing/" },
      { label: "loop", to: "/animations/loop/" },
      { label: "delay", to: "/animations/delay/" },
      { label: "decay", to: "/animations/decay/" },
      { label: "spring", to: "/animations/spring/" },
      { label: "bInterpolate", to: "/animations/bInterpolate/" },
      { label: "interpolateColor", to: "/animations/interpolateColor/" },
      { label: "bInterpolateColor", to: "/animations/bInterpolateColor/" },
      { label: "snapPoint", to: "/animations/snapPoint/" },
      { label: "moving", to: "/animations/moving/" },
    ],
  },
  {
    type: "multi",
    label: "Transformations",
    subitems: [
      { label: "translateZ", to: "/transformations/translateZ/" },
      { label: "transformOrigin", to: "/transformations/transformOrigin/" },
    ],
  },
  {
    type: "multi",
    label: "Gestures",
    subitems: [
      { label: "onScroll", to: "/gestures/onScroll/" },
      { label: "onGestureEvent", to: "/gestures/onGestureEvent/" },
      { label: "panGestureHandler", to: "/gestures/panGestureHandler/" },
      {
        label: "horizontalPanGestureHandler",
        to: "/gestures/horizontalPanGestureHandler/",
      },
      {
        label: "verticalPanGestureHandler",
        to: "/gestures/verticalPanGestureHandler/",
      },
      { label: "withSpring", to: "/gestures/withSpring/" },
      { label: "withDecay", to: "/gestures/withDecay/" },
      { label: "withOffset", to: "/gestures/withOffset/" },
      {
        label: "preserveMultiplicativeOffset",
        to: "/gestures/preserveMultiplicativeOffset/",
      },
    ],
  },
]
