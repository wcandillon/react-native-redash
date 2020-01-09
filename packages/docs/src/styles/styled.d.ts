import "styled-components"

import COLORS from "./colors"
import MEDIA from "./media"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof COLORS
    media: typeof MEDIA
  }
}
