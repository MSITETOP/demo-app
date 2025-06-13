import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * @memo App work under frame
   * Nuxt DevTools: Failed to check parent window
   * SecurityError: Failed to read a named property '__NUXT_DEVTOOLS_DISABLE__' from 'Window'
   */
  devtools: { enabled: false },

  modules: [
    '@bitrix24/b24ui-nuxt',
    '@bitrix24/b24jssdk-nuxt',
    '@nuxt/eslint'
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      allowedHosts: [
        'kodiak-emerging-tightly.ngrok-free.app'
      ]
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})