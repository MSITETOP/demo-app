import tailwindcss from '@tailwindcss/vite';
import "tailwindcss";
import "@bitrix24/b24ui-nuxt";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  /**
   * @memo App work under frame
   * Nuxt DevTools: Failed to check parent window
   * SecurityError: Failed to read a named property '__NUXT_DEVTOOLS_DISABLE__' from 'Window'
   */
  devtools: { enabled: false },
  modules: ['@bitrix24/b24ui-nuxt', // `@bitrix24/b24jssdk-nuxt`,
    '@nuxt/eslint', '@pinia/nuxt', '@bitrix24/b24jssdk-nuxt'],
    css: ['~/assets/css/main.css'],
    b24ui: {
    colorMode: true
  },
  vite: {
    server: {
      allowedHosts: ['d96a-2a0c-5a87-9304-8200-78fc-c74a-1a24-3dbe.ngrok-free.app'],
    },
    plugins: [
      tailwindcss()
    ]
  },
  
  future: {
    compatibilityVersion: 4
  },
  

  compatibilityDate: '2024-11-27'
})