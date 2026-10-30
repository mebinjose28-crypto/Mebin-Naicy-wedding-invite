import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { NotFoundPage } from '@/components/error-pages'

import { wedding, photo, photoSrcSet } from '@/config/wedding'

import '../styles.css'

const { site } = wedding
const shareImage = `${site.url}${site.shareImage}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { title: site.title },
      { name: 'description', content: site.description },
      { name: 'theme-color', content: site.themeColor },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.title },
      { property: 'og:url', content: site.url },
      { property: 'og:title', content: site.title },
      { property: 'og:description', content: site.description },
      { property: 'og:image', content: shareImage },
      { property: 'og:image:secure_url', content: shareImage },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: site.shareImageAlt },
      { property: 'og:locale', content: 'en_IN' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: site.title },
      { name: 'twitter:description', content: site.description },
      { name: 'twitter:image', content: shareImage },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'canonical', href: site.url },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap',
      },
      {
        rel: 'preload',
        as: 'image',
        href: photo(wedding.cover.photo, 768),
        imageSrcSet: photoSrcSet(wedding.cover.photo, [480, 768]),
        imageSizes: '100vw',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
