
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const basePath = '/Mebin-Naicy-wedding-invite'

export default defineConfig({
  base: `${basePath}/`,

  resolve: { tsconfigPaths: true },

  plugins: [
    tailwindcss(),
    tanstackStart({
      router: {
        basepath: basePath,
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
})
