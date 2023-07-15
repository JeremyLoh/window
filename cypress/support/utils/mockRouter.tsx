import { AppRouterContext, AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { ReactNode } from "react"

// How to mock useRouter from next/router in Cypress component testing? #22715
// https://github.com/cypress-io/cypress/discussions/22715

const createRouter = (params: Partial<AppRouterInstance>) => ({
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  basePath: "",
  back: cy.spy().as("back"),
  beforePopState: cy.spy().as("beforePopState"),
  forward: cy.spy().as("forward"),
  prefetch: cy.stub().as("prefetch").resolves(),
  push: cy.spy().as("push"),
  reload: cy.spy().as("reload"),
  replace: cy.spy().as("replace"),
  refresh: cy.spy().as("refresh"),
  events: {
    emit: cy.spy().as("emit"),
    off: cy.spy().as("off"),
    on: cy.spy().as("on"),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: "en",
  domainLocales: [],
  isPreview: false,
  ...params,
})

interface MockNextRouterProps extends Partial<AppRouterInstance> {
  children: ReactNode
}

const MockRouter = ({ children, ...props }: MockNextRouterProps) => {
  const router = createRouter(props as AppRouterInstance)

  return (
    <AppRouterContext.Provider value={router}>
      {children}
    </AppRouterContext.Provider>
  )
}

export default MockRouter
