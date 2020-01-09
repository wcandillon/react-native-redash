import { createContext } from "react"

interface IRouterContext {
  pathname: string
}

export const RouterContext = createContext<IRouterContext>({
  pathname: "/",
})

export default RouterContext
