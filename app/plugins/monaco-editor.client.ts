import { install } from '@guolao/vue-monaco-editor'

export default defineNuxtPlugin((nuxtApp) => {
  // Install Monaco Editor plugin for Vue with enhanced configuration
  nuxtApp.vueApp.use(install, {
    paths: {
      vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
    },
    'vs/nls': {
      availableLanguages: {
        '*': 'ru' // Set Russian as the default language for UI elements
      }
    }
  })
})