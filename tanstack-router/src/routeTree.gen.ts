/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProductIndexImport } from './routes/product.index'
import { Route as ProductProductIdImport } from './routes/product.$productId'

// Create Virtual Routes

const ProductLazyImport = createFileRoute('/product')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ProductLazyRoute = ProductLazyImport.update({
  path: '/product',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/product.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProductIndexRoute = ProductIndexImport.update({
  path: '/',
  getParentRoute: () => ProductLazyRoute,
} as any)

const ProductProductIdRoute = ProductProductIdImport.update({
  path: '/$productId',
  getParentRoute: () => ProductLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/product': {
      preLoaderRoute: typeof ProductLazyImport
      parentRoute: typeof rootRoute
    }
    '/product/$productId': {
      preLoaderRoute: typeof ProductProductIdImport
      parentRoute: typeof ProductLazyImport
    }
    '/product/': {
      preLoaderRoute: typeof ProductIndexImport
      parentRoute: typeof ProductLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AboutLazyRoute,
  ProductLazyRoute.addChildren([ProductProductIdRoute, ProductIndexRoute]),
])

/* prettier-ignore-end */
