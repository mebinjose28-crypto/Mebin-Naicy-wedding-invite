
import { createRouter } from '@tanstack/react-router'
import { RouteErrorPage } from '@/components/error-pages'

import { routeTree } from './routeTree.gen'

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    basepath: '/Mebin-Naicy-wedding-invite',
    defaultErrorComponent: RouteErrorPage,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
