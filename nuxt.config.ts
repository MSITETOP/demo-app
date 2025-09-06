import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Set the source directory to 'app'
  srcDir: 'app/',
  
  // Configure for GitHub Pages deployment
  app: {
    baseURL:  '/ui/'
  },

  /**
   * @memo App work under frame
   * Nuxt DevTools: Failed to check parent window
   * SecurityError: Failed to read a named property '__NUXT_DEVTOOLS_DISABLE__' from 'Window'
   */
  devtools: { enabled: false },

  modules: [
    '@bitrix24/b24ui-nuxt',
    `@bitrix24/b24jssdk-nuxt`,
    '@nuxt/eslint'
  ],

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    disableTransition: true
  },

  css: ['~/assets/css/main.css'],

  // Enable static site generation for GitHub Pages
  nitro: {
    prerender: {
      //routes: ['/sitemap.xml']
    }
  },
  
  // Configure for static deployment
  ssr: true,

  vite: {
    server: {
      // allow incoming requests from this host
      allowedHosts: [
        'simple-firm-possum.ngrok-free.app',
        'dotingly-prospering-hawfinch.cloudpub.ru'
      ],
      // and don't forget CORS, if needed:
      cors: true
    },
    plugins: [
      tailwindcss()
    ],
    optimizeDeps: {
      include: [
        'monaco-editor/esm/vs/editor/editor.api',
        'monaco-editor/esm/vs/language/typescript/ts.worker',
        'monaco-editor/esm/vs/language/json/json.worker',
        'monaco-editor/esm/vs/editor/editor.worker'
      ]
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})